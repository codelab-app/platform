import { UserOGM } from '@codelab/backend/adapter/neo4j'
import { UserCreateInput } from '@codelab/shared/abstract/codegen'

export const upsertUser = async (user: UserCreateInput) => {
  const User = await UserOGM()

  const [existing] = await User.find({
    where: {
      auth0Id: user.auth0Id,
    },
  })

  if (existing) {
    // console.debug(`User with email ${user.email} already exists!`)

    const { users } = await User.update({
      where: {
        auth0Id: user.auth0Id,
      },
      update: {
        auth0Id: user.auth0Id,
        email: user.email,
        username: user.username,
        roles: [],
      },
    })

    return users[0]
  } else {
    try {
      const { users } = await User.create({
        input: [
          {
            auth0Id: user.auth0Id,
            email: user.email,
            username: user.email,
            roles: [],
          },
        ],
      })

      console.debug('Created', users)

      return users[0]
    } catch (e) {
      console.error(e)
    }
  }

  return null
}
