import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getPosts() {
    return 'All posts';
  }

  createPost(body: any) {
    return body;
  }

  getPost(id: string) {
    return {
      data: 'post id',
      postId: id,
    };
  }

  updatePost(id: string, body: any) {
    return `Update post ${id} with data ${body}`;
  }

  deletePost(id: string) {
    return `Delete post ${id}`;
  }
}
