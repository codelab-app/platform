import { isLeft, isRight } from 'fp-ts/Either'
import { Password } from './password'

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

    // const paths = getPaths(result)
    // console.log(paths)
    // console.log(PathReporter.report(result))

    expect(isLeft(result)).toBeTruthy()
  })
})
