import { UserPassword } from './user-password'
import { ValueObject } from '@codelab/ddd/shared/core'

describe('User password', () => {
  const createUserPassword = (password: string): UserPassword =>
    ValueObject.create(UserPassword, password)

  describe('validation', () => {
    it('returns a failed result with unsuccessful validation', () => {
      expect(() => createUserPassword('p')).toThrowError(
        'Password must contain at least 3 characters',
      )
    })

    it('returns a ok result with successful validation', () => {
      const userPassword = createUserPassword('password')

      expect(userPassword.toString()).toBe('password')
    })
  })

  describe('hashing', () => {
    let userPassword: UserPassword

    beforeAll(() => {
      userPassword = createUserPassword('password')

      userPassword.hashPassword()
    })
    it('hashes a password', () => {
      expect(userPassword.toString()).not.toBe('password')
    })

    it('compares a password', () => {
      const validPassword = userPassword.comparePassword('password')
      const invalidPassword = userPassword.comparePassword('invalid-password')

      expect(validPassword).toBeTruthy()
      expect(invalidPassword).toBeFalsy()
    })
  })
})
