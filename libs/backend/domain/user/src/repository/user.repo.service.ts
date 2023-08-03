import type {
  User,
  UserModel,
  UserOptions,
  UserWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OGMService,
  userSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class UserRepository extends AbstractRepository<
  IUserDTO,
  User,
  UserWhere,
  UserOptions
> {
  constructor(private ogmService: OGMService) {
    super()
  }

  protected async _find({
    options,
    where,
  }: {
    options?: UserOptions
    where?: UserWhere
  }) {
    return await (
      await this.ogmService.User
    ).find({
      options,
      selectionSet: userSelectionSet,
      where,
    })
  }

  protected async _add(users: Array<IUserDTO>) {
    return (
      await (
        await this.ogmService.User
      ).create({
        input: users.map(({ apps, ...user }) => ({
          ...user,
        })),
      })
    ).users
  }

  protected async _update({ apps, id, ...user }: IUserDTO, where: UserWhere) {
    return (
      await (
        await this.ogmService.User
      ).update({
        update: {
          ...user,
          // apps: apps.map((app) => connectNodeId(app.id)),
        },
        where,
      })
    ).users[0]
  }
}
