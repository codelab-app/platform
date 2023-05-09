import type { User, UserWhere } from '@codelab/backend/abstract/codegen'
import {
  Repository,
  userSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IUserDTO } from '@codelab/shared/abstract/core'

export class UserRepository extends AbstractRepository<
  IUserDTO,
  User,
  UserWhere
> {
  private User = Repository.instance.User

  async _find(where: UserWhere) {
    return await (
      await this.User
    ).find({
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

export type IUserRepository = typeof UserRepository
