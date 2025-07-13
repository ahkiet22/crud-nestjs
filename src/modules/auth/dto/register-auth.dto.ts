import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterAuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsString({ message: 'Email must be a string' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString({ message: 'Password must be a string' })
  password: string

  @IsNotEmpty({ message: 'Confirm Password is required' })
  @MinLength(6, { message: 'Confirm password must be at least 6 characters' })
  @IsString()
  confirmPassword: string
}
