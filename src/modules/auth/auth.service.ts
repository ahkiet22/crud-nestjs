import { BadRequestException, Injectable } from '@nestjs/common'
import { HashService } from '../../libs/crypto/hash.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly prismaService: PrismaService,
  ) {}
  async register(body: any) {
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
        throw new BadRequestException('Email already exists!')
      } else {
        throw error
      }
    }
  }
}
