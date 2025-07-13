import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { HashService } from '../../libs/crypto/hash.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { RegisterAuthDto } from './dto/register-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}
  async register(body: RegisterAuthDto) {
    try {
      const hasPassword = await this.hashService.hash(body.password)
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hasPassword,
          name: body.name,
        },
      })
      return user
    } catch (error) {
      console.log(error)
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException([
          {
            field: 'email',
            error: 'Email already exists',
          },
        ])
      } else {
        console.log('auth errors', error)
        throw error
      }
    }
  }

  async login(body: LoginAuthDto) {
    try {
      const user = await this.prismaService.user.findUnique({ where: { email: body.email } })
      if (!user) {
        throw new NotFoundException([
          {
            field: 'email',
            error: 'Account does not exists',
          },
        ]) // Email is not registered.
      }

      const isPasswordMatch = await this.hashService.compare(body.password, user.password)
      if (!isPasswordMatch) {
        throw new UnauthorizedException([
          {
            field: 'password',
            errors: 'Incorrect password',
          },
        ])
      }

      const tokens = await this.generateTokens({ userId: user.id })
      return tokens
    } catch (error) {
      // 1) Log nội bộ
      console.log('Login failed', error)

      // 2) Nếu đã là HttpException thì ném lại
      if (error instanceof HttpException) {
        throw error
      }
      // 3) Ngược lại ném InternalServerError
      throw new InternalServerErrorException()
    }
  }

  async generateTokens(payload: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken(payload),
      this.tokenService.signRefreshToken(payload),
    ])
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt: new Date(decodedRefreshToken.exp * 1000),
      },
    })
    return { accessToken, refreshToken }
  }

  async refreshToken(refreshToken: string) {
    try {
      // 1.verify token
      const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)

      // 2. verify refreshToken already in database
      await this.prismaService.refreshToken.findUniqueOrThrow({
        where: {
          token: refreshToken,
        },
      })

      // 3. Delete refreshToken old
      await this.prismaService.refreshToken.delete({
        where: {
          token: refreshToken,
        },
      })

      // 4. create new accessToken and refreshToken
      return this.generateTokens({ userId })
    } catch (error) {
      console.log(error)

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new UnauthorizedException('Refresh token has been revoked')
      }
      throw new UnauthorizedException()
    }
  }
}
