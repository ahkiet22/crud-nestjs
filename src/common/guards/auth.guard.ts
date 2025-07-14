import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { TokenService } from 'src/modules/auth/token.service'
import { REQUEST_USER_KEY } from '../constants/auth.constant'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const asccessToken = request.headers.authorization?.split(' ')[1]
    if (!asccessToken) {
      return false
    }
    try {
      const decodedAccessToken = await this.tokenService.verifyAccessToken(asccessToken)
      request[REQUEST_USER_KEY] = decodedAccessToken.userId
      return true
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException()
    }
  }
}
