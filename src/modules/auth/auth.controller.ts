import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterAuthDto, RegisterResponseDto } from './dto/register-auth.dto'
import { LoginAuthDto, LoginResponseDto } from './dto/login-auth.dto'
import { zip } from 'rxjs/operators'
import { RefreshTokenBodyDto, RefreshTokenResponseDto } from './dto/token-dto'
import { AuthGuard } from 'src/common/guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @SerializeOptions({ type: RegisterResponseDto })
  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    return new RegisterResponseDto(await this.authService.register(body))
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginAuthDto) {
    return new LoginResponseDto(await this.authService.login(body))
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshTokenBodyDto) {
    return new RefreshTokenResponseDto(await this.authService.refreshToken(body.refreshToken))
  }
}
