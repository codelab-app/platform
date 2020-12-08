import { RequestValidationError } from '../../../../shared/core/application/common/errors/RequestValidationError'
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

  it('creates a user object successfully', () => {
    const userProps = {
      email: 'admin@codelab.ai',
      password: 'password',
    }
    const user = User.create(userProps)

    expect(user.email instanceof UserEmail).toBeTruthy()
    expect(user.password instanceof UserPassword).toBeTruthy()

    expect(user.email.toString()).toBe('admin@codelab.ai')
    expect(user.password.toString()).toBe('password')
  })

  it('throws an exception when given invalid input', () => {
    const userProps = {
      email: 'not-an-email',
      password: 'password',
    }

    expect(() => User.create(userProps)).toThrow(RequestValidationError)
  })

  it('throws at most 1 exception', () => {
    const userProps = {
      email: 'not-an-email',
      password: 'p',
    }

    expect(() => User.create(userProps)).toThrow(RequestValidationError)
  })
})
