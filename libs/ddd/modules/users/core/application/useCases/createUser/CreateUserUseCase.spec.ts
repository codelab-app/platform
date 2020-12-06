import { classToPlain } from 'class-transformer'
import { User } from '../../../domain/user'
import { UserEmail } from '../../../domain/user-email'
import { UserPassword } from '../../../domain/user-password'

describe('CreateUserUseCase', () => {
  it('validates the request', () => {
    const email = new UserEmail({ value: 'admin@codelab.ai' })
    const password = new UserPassword({ value: 'password' })
    const user = new User({ email, password })

    const serializedUser = classToPlain(user)

    expect(serializedUser).toMatchObject({
      email: 'admin@codelab.ai',
      password: 'password',
    })
  })
})
