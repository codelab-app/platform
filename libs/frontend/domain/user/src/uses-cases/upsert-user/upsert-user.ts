import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { Auth0SessionUser } from '@codelab/shared/abstract/core'
import { JWT_CLAIMS } from '@codelab/shared/abstract/core'

/**
 * Create user using OGM, used by Next.js serverless for first time logins.
 *
 * Also used by specs to create a user
 */
export const upsertUser = async (
  User: OGM_TYPES.UserModel,
  user: Pick<
    Auth0SessionUser,
    'sub' | 'email' | 'nickname' | typeof JWT_CLAIMS
  >,
) => {
  const [existing] = await User.find({
    where: {
      auth0Id: user.sub,
    },
  })

  if (existing) {
    // console.debug(`User with email ${user.email} already exists!`)

    const { users } = await User.update({
      where: {
        auth0Id: user.sub,
      },
      update: {
        auth0Id: user.sub,
        email: user.email,
        username: user.nickname,
        roles: user[JWT_CLAIMS].roles,
      },
    })
  } else {
    try {
      const { users } = await User.create({
        input: [
          {
            auth0Id: user.sub,
            email: user.email,
            username: user.email,
            roles: user[JWT_CLAIMS].roles,
          },
        ],
      })

      return users[0]
    } catch (e) {
      console.log({ e })
    }
  }

  return
}
