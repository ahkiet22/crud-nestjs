import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterAuthDto, RegisterResponseDto } from './dto/register-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @SerializeOptions({ type: RegisterResponseDto })
  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    return new RegisterResponseDto(await this.authService.register(body))
  }
}
