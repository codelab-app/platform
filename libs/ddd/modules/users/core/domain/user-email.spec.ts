import { UserEmail } from './user-email'
import { ValueObject } from '@codelab/ddd/shared/core'

describe('User email request validation', () => {
  it('returns a failed result with an unsuccessful validation', () => {
    const userEmail = ValueObject.create(UserEmail, { value: 'not-an-email' })

    expect(userEmail.isFailure).toBeTruthy()
    expect(userEmail.errors).toBe('Email must be valid')
  })

  it('returns an ok result with an successful validation', () => {
    const userEmail = ValueObject.create(UserEmail, {
      value: 'admin@codelab.ai',
    })

    expect(userEmail.isSuccess).toBeTruthy()
  })
})
