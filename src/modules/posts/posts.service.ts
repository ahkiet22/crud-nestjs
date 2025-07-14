import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreatepostBodyDto } from './dto/create-post.dto'
import { UpdatePostBodyDto } from './dto/update-post.dto'
import { isNotFoundPrismaError } from 'src/common/helpers/prisma-error'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  getPosts(userId: number) {
    return this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  }

  createPost(userId: number, body: CreatepostBodyDto) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  }

  async getPost(postId: number) {
    try {
      const post = await this.prismaService.post.findUniqueOrThrow({
        where: {
          id: postId,
        },
        include: {
          author: {
            omit: {
              password: true,
            },
          },
        },
      })
      return post
    } catch (error) {
      console.log(error)
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found')
      }
      throw new error()
    }
  }

  async updatePost({ postId, userId, body }: { postId: number; body: UpdatePostBodyDto; userId: number }) {
    try {
      const post = await this.prismaService.post.update({
        where: {
          id: postId,
          authorId: userId,
        },
        data: {
          title: body.title,
          content: body.content,
        },
        include: {
          author: {
            omit: {
              password: true,
            },
          },
        },
      })
      return post
    } catch (error) {
      console.log(error)
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }

  async deletePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      await this.prismaService.post.delete({
        where: {
          id: postId,
          authorId: userId,
        },
      })
      return true
    } catch (error) {
      console.log(error)

      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }
}
