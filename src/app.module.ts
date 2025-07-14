import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './modules/posts/posts.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { HashService } from './libs/crypto/hash.service'
import { AuthModule } from './modules/auth/auth.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TokenModule } from './modules/token/token.module'
import { GuardsModule } from './common/guards/guards.module'
import { AuthenticationGuard } from './common/guards/auth.guard'

const Modules = [PostsModule, TokenModule, AuthModule]
@Module({
  imports: [...Modules, PrismaModule, GuardsModule],
  controllers: [AppController],
  providers: [
    AppService,
    HashService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
