import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { Auth0SessionUser } from '@codelab/shared/abstract/core'

/**
 * Create user using OGM, used by Next.js serverless for first time logins.
 *
 * Also used by specs to create a user
 */
export const upsertUser = async (
  User: OGM_TYPES.UserModel,
  user: Pick<Auth0SessionUser, 'sub' | 'email' | 'nickname'>,
) => {
  if (user) {
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
          roles: [],
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
              roles: [],
            },
          ],
        })

        return users[0]

        // console.log('Created', users)
      } catch (e) {
        // console.error(e)
      }
    }
  }

  return null
}
