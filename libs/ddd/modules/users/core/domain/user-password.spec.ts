import { UserPassword } from './user-password'
import { ValueObject } from '@codelab/ddd/shared/core'

describe('User password request validation', () => {
  it('returns a failed result with unsuccessful validation', () => {
    const userPassword = ValueObject.create(UserPassword, {
      value: 'p ',
    })

    expect(userPassword.isFailure).toBeTruthy()
    expect(userPassword.errors).toBe(
      'Password must contain at least 3 characters',
    )
  })

  it('returns a ok result with successful validation', () => {
    const userPassword = ValueObject.create(UserPassword, {
      value: 'password ',
    })

    expect(userPassword.isSuccess).toBeTruthy()
  })
})
