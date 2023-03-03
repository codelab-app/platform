import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import type { UserCreateInput } from '@codelab/shared/abstract/codegen'
import type { IRole } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

type UserUniqueWhereCallback = (user: UserCreateInput) =>
  | {
      auth0Id: string
    }
  | {
      email: string
    }

export const upsertUser = async (
  user: UserCreateInput & { roles: Array<IRole> },
  where: UserUniqueWhereCallback,
) => {
  const User = await Repository.instance.User

  const [existing] = await User.find({
    where: where(user),
  })

  if (existing) {
    console.debug(`User with email ${user.email} already exists!`)

    const { users } = await User.update({
      update: {
        auth0Id: user.auth0Id,
        email: user.email,
        roles: user.roles,
        username: user.username,
      },
      where: where(user),
    })

    return users[0]
  }

  try {
    const { users } = await User.create({
      input: [
        {
          auth0Id: user.auth0Id,
          email: user.email,
          id: v4(),
          roles: user.roles,
          username: user.email,
        },
      ],
    })

    console.debug('Created', users)

    return users[0]
  } catch (error) {
    console.error(error)
  }

  return null
}
