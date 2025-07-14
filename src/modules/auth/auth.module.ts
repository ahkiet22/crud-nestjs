import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { HashService } from 'src/libs/crypto/hash.service'
@Module({
  providers: [AuthService, HashService],
  controllers: [AuthController],
})
export class AuthModule {}
