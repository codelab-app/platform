import { isLeft, isRight } from 'fp-ts/lib/Either'
import { Email } from './email'

describe('Email codec', () => {
  it('is right for valid email', () => {
    const email = 'admin@codelab.ai'
    const result = Email.decode(email)

    expect(isRight(result)).toBeTruthy()
  })

  it('is left for invalid email', () => {
    const email = 'not-an-email'
    const result = Email.decode(email)

    expect(isLeft(result)).toBeTruthy()
  })
})
