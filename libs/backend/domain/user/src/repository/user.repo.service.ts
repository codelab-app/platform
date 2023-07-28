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
import type { OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository
  extends AbstractRepository<IUserDTO, User, UserWhere, UserOptions>
  implements OnModuleInit
{
  private User!: UserModel

  constructor(private ogmService: OGMService) {
    super()
  }

  onModuleInit() {
    console.log('onModuleInit UserRepository')
    this.User = this.ogmService.getModel('User')
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

  protected async _add(users: Array<IUserDTO>) {
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

  protected async _update({ apps, id, ...user }: IUserDTO, where: UserWhere) {
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
