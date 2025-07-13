import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './modules/posts/posts.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { HashService } from './libs/crypto/hash.service'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [PostsModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, HashService],
})
export class AppModule {}
