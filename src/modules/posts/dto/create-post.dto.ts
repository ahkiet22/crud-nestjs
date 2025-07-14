import { IsString } from 'class-validator'

export class CreatepostBodyDto {
  @IsString()
  title: string

  @IsString()
  content: string
}
