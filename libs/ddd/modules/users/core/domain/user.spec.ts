import { classToPlain, plainToClass } from 'class-transformer'
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

  it('can hydrate a user object', () => {
    const userProps = {
      email: 'admin@codelab.ai',
      password: 'password',
    }
    const user = plainToClass(User, userProps)

    expect(user.email instanceof UserEmail).toBeTruthy()
    expect(user.password instanceof UserPassword).toBeTruthy()

    expect(user.email.toString()).toBe('admin@codelab.ai')
    expect(user.password.toString()).toBe('password')
  })

  it('can serialize to a plain object', () => {
    const email = new UserEmail({ value: 'admin@codelab.ai' })
    const password = new UserPassword({ value: 'password' })
    const user = new User({ email, password })

    const serializedUser = classToPlain(user)

    expect(serializedUser).toMatchObject({
      email: 'admin@codelab.ai',
      password: 'password',
    })
  })

  // it("validates a user's email", () => {})
})
