import type { UserModel } from '@codelab/backend'
import { Auth0SessionUser } from '@codelab/shared/abstract/core'

/**
 * Create user using OGM, used by Next.js serverless for first time logins.
 *
 * Also used by specs to create a user
 */
export const upsertUser = async (User: UserModel, user: Auth0SessionUser) => {
  if (user) {
    const [existing] = await User.find({
      where: {
        auth0Id: user.sub,
      },
    })

    if (existing) {
      console.log(`User with email ${user.email} already exists!`)
    } else {
      try {
        const { users } = await User.create({
          input: [
            {
              auth0Id: user.sub,
              email: user.email,
            },
          ],
        })

        // console.log('Created', users)
      } catch (e) {
        // console.error(e)
      }
    }
  }
}
