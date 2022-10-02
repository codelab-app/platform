import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { UserCreateInput } from '@codelab/shared/abstract/codegen'

type UserUniqueWhereCallback = (user: UserCreateInput) =>
  | {
      auth0Id: string
    }
  | {
      email: string
    }

export const upsertUser = async (
  user: UserCreateInput,
  where: UserUniqueWhereCallback,
) => {
  const User = await Repository.instance.User

  const [existing] = await User.find({
    where: where(user),
  })

  if (existing) {
    console.debug(`User with email ${user.email} already exists!`)

    const { users } = await User.update({
      where: where(user),
      update: {
        auth0Id: user.auth0Id,
        email: user.email,
        username: user.username,
        roles: user.roles,
      },
    })

    return users[0]
  }

  try {
    const { users } = await User.create({
      input: [
        {
          auth0Id: user.auth0Id,
          email: user.email,
          username: user.email,
          roles: user.roles,
        },
      ],
    })

    console.debug('Created', users)

    return users[0]
  } catch (e) {
    console.error(e)
  }

  return null
}
