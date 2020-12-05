import { classToPlain } from 'class-transformer'
import { User } from './user'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'

describe('Domain model User', () => {
  let user: User

  beforeAll(() => {
    const email = new UserEmail({ value: 'admin@codelab.ai' })
    const password = new UserPassword({ value: 'password' })

    user = new User({ email, password })
  })

  it('can serialize to a plain object', () => {
    const serializedUser = classToPlain(user)

    expect(serializedUser).toMatchObject({
      email: 'admin@codelab.ai',
      password: 'password',
    })
  })
})
