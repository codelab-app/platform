import { isLeft } from 'fp-ts/Either'
import { v4 as uuidv4 } from 'uuid'
import { UserDTO, UserEntity } from './user.codec'

describe('User entity codec', () => {
  it('fails for missing "id"', () => {
    const data = {
      email: 'admin@codelab.ai',
      password: 'password',
    }

    const results = UserEntity.decode(data)

    expect(isLeft(results)).toBeTruthy()
  })

  it('fails for invalid "id"', () => {
    const data = {
      id: 'invalid-id',
      email: 'admin@codelab.ai',
      password: 'password',
    }

    const results = UserEntity.decode(data)

    expect(isLeft(results)).toBeTruthy()
  })

  it('transforms correct json data', () => {
    const data = {
      id: uuidv4(),
      email: 'admin@codelab.ai',
      password: 'password',
    }
    const results = UserEntity.decode(data)

    if (isLeft(results)) {
      throw new Error()
    }

    expect(results.right).toStrictEqual({
      ...data,
      password: results.right.password,
    })
    expect(results.right.password).not.toBe('password')
  })

  it('transforms user dto', () => {
    const data = {
      email: 'admin@codelab.ai',
      password: 'password',
    }

    const results = UserDTO.decode(data)

    if (isLeft(results)) {
      throw new Error()
    }

    expect(results.right).toEqual(data)
  })
})
