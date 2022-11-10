import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { Auth0SessionUser, JWT_CLAIMS } from '@codelab/shared/abstract/core'

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

  console.log('roles', user[JWT_CLAIMS].roles)

  if (existing) {
    // console.debug(`User with email ${user.email} already exists!`)

    console.log('found')

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
      console.log(
        'create new',
        JSON.stringify(
          {
            input: [
              {
                auth0Id: user.sub,
                email: user.email,
                username: user.email,
                roles: user[JWT_CLAIMS].roles,
              },
            ],
          },
          null,
          2,
        ),
      )

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

      console.log('creating new users', users)

      return users[0]

      // console.log('Created', users)
    } catch (e) {
      console.log({ e })

      // console.error(e)
    }
  }

  return
}
