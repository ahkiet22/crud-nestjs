import { IsString } from 'class-validator'
import { LoginResponseDto } from './login-auth.dto'

export class RefreshTokenBodyDto {
  @IsString()
  refreshToken: string
}

export class RefreshTokenResponseDto extends LoginResponseDto {
}
