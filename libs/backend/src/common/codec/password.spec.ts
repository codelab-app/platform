import { isLeft, isRight } from 'fp-ts/Either'
import * as t from 'io-ts'
import { Password } from './password'
import { getErrors } from './reporter'

describe('Password codec', () => {
  it('hashes a  valid password', () => {
    const password = 'password'
    const result = Password.decode(password)

    console.log(result)

    expect(isRight(result)).toBeTruthy()
  })

  it('fails for invalid password', () => {
    const password = 'a'
    const result = Password.decode(password)

    expect(isLeft(result)).toBeTruthy()
  })

  it('throws custom error message', () => {
    const PasswordField = t.type({
      password: Password,
    })

    const result = PasswordField.decode({ password: '0' })

    const errors = getErrors(result)

    console.log(errors)

    expect(isLeft(result)).toBeTruthy()
  })
})
