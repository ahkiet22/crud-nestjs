import { Exclude } from 'class-transformer'
import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterAuthDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string

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

export class RegisterResponseDto {
  id: number
  email: string
  @Exclude() password: string
  createAt: Date
  updateAt: Date

  constructor(partial: Partial<RegisterResponseDto>) {
    Object.assign(this, partial)
  }
}
