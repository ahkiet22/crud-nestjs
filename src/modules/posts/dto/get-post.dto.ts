import { Type } from 'class-transformer'
import { PostModel } from 'src/common/models/post.model'
import { UserModel } from 'src/common/models/user.model'

export class GetPostItemDto extends PostModel {
  @Type(() => UserModel)
  author: Omit<UserModel, 'password'>

  constructor(partial: Partial<UserModel>) {
    super(partial)
    Object.assign(this, partial)
  }
}
