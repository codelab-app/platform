import { UserEmail } from './user-email'

describe('User email request validation', () => {
  it('returns a failed result with an unsuccessful validation', () => {
    const userEmail = UserEmail.create({ value: 'not-an-email' })

    expect(userEmail.isFailure).toBeTruthy()
    expect(userEmail.isSuccess).toBeFalsy()
    expect(userEmail.errors).toBe('Email must be valid')
  })

  it('returns an ok result with an unsuccessful validation', () => {
    const userEmail = UserEmail.create({ value: 'admin@codelab.ai' })

    expect(userEmail.isFailure).toBeFalsy()
    expect(userEmail.isSuccess).toBeTruthy()
  })
})
