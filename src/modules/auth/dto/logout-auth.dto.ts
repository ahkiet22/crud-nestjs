import { IsString } from 'class-validator'
import { RefreshTokenBodyDto } from './token-dto'

export class LogoutBodyDto extends RefreshTokenBodyDto {}

export class LogoutResponseDto {
  message: string

  constructor(partial: Partial<LogoutResponseDto>) {
    Object.assign(this, partial)
  }
}
