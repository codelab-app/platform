import { UserEmail } from './user-email'

describe('UserEmail', () => {
  it('returns a failed result with an unsuccessful validation', () => {
    const userEmail = UserEmail.create({ value: 'not-an-email' })

    expect(userEmail.isFailure).toBeTruthy()
    expect(userEmail.isSuccess).toBeFalsy()
  })
})
