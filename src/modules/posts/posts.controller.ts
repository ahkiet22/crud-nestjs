import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { AccessTokenGuard } from 'src/common/guards/access-token.guard'
import { ApiKeyGuard } from 'src/common/guards/api-key.guard'
import { Auth } from 'src/common/decorators/auth.decorator'
import { AuthType, ConditionGuard, REQUEST_USER_KEY } from 'src/common/constants/auth.constant'
import { AuthenticationGuard } from 'src/common/guards/auth.guard'
import { Request } from 'express'
import { ActiveUser } from 'src/common/decorators/active-user.decorator'
import { TokenPayload } from 'src/types/jwt'
import { GetPostItemDto } from './dto/get-post.dto'
import { CreatepostBodyDto } from './dto/create-post.dto'
import { UpdatePostBodyDto } from './dto/update-post.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.ApiKey], { condition: ConditionGuard.And })
  @Get()
  getPosts(@ActiveUser('userId') userId: number) {
    return this.postService.getPosts(userId).then((posts) => posts.map((post) => new GetPostItemDto(post)))
  }

  @Post()
  @Auth([AuthType.Bearer])
  async createPost(@Body() body: CreatepostBodyDto, @ActiveUser('userId') userId: number) {
    return new GetPostItemDto(await this.postService.createPost(userId, body))
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return new GetPostItemDto(await this.postService.getPost(Number(id)))
  }

  @Put(':id')
  @Auth([AuthType.Bearer])
  async updatepost(@Param('id') id: string, @Body() body: UpdatePostBodyDto, @ActiveUser('userId') userId: number) {
    return new GetPostItemDto(
      await this.postService.updatePost({
        postId: Number(id),
        userId,
        body,
      }),
    )
  }

  @Delete(':id')
  @Auth([AuthType.Bearer])
  deletePost(@Param('id') id: string, @ActiveUser('userId') userId: number): Promise<boolean> {
    return this.postService.deletePost({ postId: Number(id), userId })
  }
}
