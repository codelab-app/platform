import { UserEmail } from './user-email'
import { ValueObject } from '@codelab/ddd/shared/core'

describe('User email request validation', () => {
  const createUserEmail = (email: string): UserEmail =>
    ValueObject.create(UserEmail, email)

  it('throws an error result with an unsuccessful validation', () => {
    expect(() => createUserEmail('not-an-email')).toThrowError(
      'Email must be valid',
    )
  })

  it('returns an ok result with an successful validation', () => {
    const userEmail = createUserEmail('admin@codelab.ai')

    expect(userEmail).toBeInstanceOf(UserEmail)
    expect(userEmail.toString()).toBe('admin@codelab.ai')
  })
})
