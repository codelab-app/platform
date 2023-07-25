import type {
  User,
  UserOptions,
  UserWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OGMService,
  userSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { ICreateUserDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends AbstractRepository<
  ICreateUserDTO,
  User,
  UserWhere,
  UserOptions
> {
  private User

  constructor(ogmService: OGMService) {
    super()
    this.User = ogmService.getModel('User')
  }

  protected async _find({
    options,
    where,
  }: {
    options?: UserOptions
    where?: UserWhere
  }) {
    return await (
      await this.User
    ).find({
      options,
      selectionSet: userSelectionSet,
      where,
    })
  }

  protected async _add(users: Array<ICreateUserDTO>) {
    return (
      await (
        await this.User
      ).create({
        input: users.map(({ apps, ...user }) => ({
          ...user,
        })),
      })
    ).users
  }

  protected async _update(
    { apps, id, ...user }: ICreateUserDTO,
    where: UserWhere,
  ) {
    return (
      await (
        await this.User
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

export type IUserRepository = typeof UserRepository
