import type { IUser } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  Repository,
  userSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import type { UserWhere } from '@codelab/shared/abstract/types'

export class UserRepository extends AbstractRepository<IUser> {
  private User = Repository.instance.User

  async find(where: UserWhere) {
    return (
      await (
        await this.User
      ).find({
        where,
        selectionSet: userSelectionSet,
      })
    )[0]
  }

  protected async _add(users: Array<IUser>) {
    return (
      await (
        await this.User
      ).create({
        input: users.map((user) => ({
          ...user,
        })),
      })
    ).users
  }

  protected async _update({ id, ...user }: IUser, where: UserWhere) {
    return (
      await (
        await this.User
      ).update({
        update: user,
        where,
      })
    ).users[0]
  }
}
