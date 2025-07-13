import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { HashService } from 'src/libs/crypto/hash.service'
import { TokenService } from './token.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  providers: [AuthService, HashService, TokenService],
  controllers: [AuthController],
  imports: [JwtModule],
})
export class AuthModule {}
