import type { UserOptions, UserWhere } from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/validation'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { type INodeType, type IUserDto } from '@codelab/shared/abstract/core'
import { UserFragment } from '@codelab/shared/infra/gql'
import { userApi, userMapper } from '@codelab/shared-domain-module/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends AbstractRepository<
  INodeType.User,
  IUserDto,
  UserFragment,
  UserWhere,
  UserOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: PinoLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(users: Array<IUserDto>) {
    const {
      createUsers: { users: createdUsers },
    } = await userApi().CreateUser({
      input: users.map((user) => userMapper.toCreateInput(user)),
    })

    return createdUsers
  }

  protected async _find({
    options,
    where,
  }: {
    options?: UserOptions
    where?: UserWhere
  }) {
    const { items } = await userApi().GetUsers({
      where,
    })

    return items
  }

  protected async _update(user: IUserDto, where: UserWhere) {
    const {
      updateUsers: { users },
    } = await userApi().UpdateUsers({
      update: userMapper.toUpdateInput(user),
      where,
    })

    return users[0]
  }
}
