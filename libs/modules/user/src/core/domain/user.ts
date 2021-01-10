import { Type, plainToClass } from 'class-transformer'
import { SerializedUserDto } from './dto/SerializedUserDto'
import { UserAccessToken } from './user-accessToken'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'
import {
  AggregateRoot,
  NOID,
  TransformBoth,
  TypeOrmUser,
  UUID,
} from '@codelab/backend'

export class User<ID extends UUID | NOID = UUID> extends AggregateRoot<
  SerializedUserDto,
  ID
> {
  @Type(() => UserEmail)
  @TransformBoth(UserEmail)
  declare email: UserEmail

  @Type(() => UserPassword)
  @TransformBoth(UserPassword)
  declare password: UserPassword

  @Type(() => UserAccessToken)
  @TransformBoth(UserAccessToken)
  declare accessToken: UserAccessToken

  set setAccessToken(token: string) {
    this.accessToken = new UserAccessToken({ value: token })
  }

  toPersistence(): TypeOrmUser {
    return plainToClass(TypeOrmUser, this.toPlain())
  }
}
