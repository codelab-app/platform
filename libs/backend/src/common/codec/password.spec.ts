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
    const passwordNum = 3
    // const result = Password.decode(passwordNum)

    const Pass = t.type({
      password: Password,
    })
    const result = Pass.decode({ password: passwordNum })

    const errors = getErrors(result)
    // const paths = getPaths(result)
    // console.log(paths)

    console.log(errors)

    expect(isLeft(result)).toBeTruthy()
  })
})
