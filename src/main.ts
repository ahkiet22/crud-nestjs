import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các thuộc tính không được khai báo trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có thuộc tính không hợp lệ trong request (thay vì chỉ bỏ qua)
      transform: true, // Chuyển đổi kiểu dữ liệu từ request về đúng kiểu trong DTO (e.g., "123" → number)
      transformOptions: {
        enableImplicitConversion: true, // Nest will auto convert query param "123" to number 123 flow type of DTO
      },
      exceptionFactory(validationErrors) {
        return new UnprocessableEntityException(
          validationErrors.map((error) => ({
            fied: error.property,
            errors: Object.values(error.constraints || {}).join(', '),
          })),
        )
      },
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
