import { classToPlain } from 'class-transformer'
import { User } from './user'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'

describe('Domain model User', () => {
  // let user: User
  // const email = new UserEmail({ value: 'admin@codelab.ai' })
  // const password = new UserPassword({ value: 'password' })
  // const date = new Date()

  // beforeAll(() => {
  //   user = new User({ email, password, date })
  // })

  it('can serialize to a plain object', () => {
    const email = new UserEmail({ value: 'admin@codelab.ai' })
    const password = new UserPassword({ value: 'password' })
    const user = new User({ email, password })

    const serializedUser = classToPlain(user)

    console.log(serializedUser)

    expect(serializedUser).toMatchObject({
      email: 'admin@codelab.ai',
      password: 'password',
    })
  })
})
