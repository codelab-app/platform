import { v4 as uuidv4 } from 'uuid'
import { User } from './user'

describe('User', () => {
  it('throws error with invalid password', () => {
    const data = {
      id: uuidv4(),
      email: 'admin@codelab.ai',
      password: 'p',
    }

    expect(() => User.create(data)).toThrowError()
  })

  it('throws error with invalid email', () => {
    const data = {
      id: uuidv4(),
      email: 'not-an-emil',
      password: 'password',
    }

    expect(() => User.create(data)).toThrowError()
  })

  it('succeeds with valid data', () => {
    const data = {
      id: uuidv4(),
      email: 'admin@codelab.ai',
      password: 'password',
    }

    expect(() => User.create(data)).not.toThrowError()
  })

  it('builds from create data', () => {
    const data = {
      id: uuidv4(),
      email: 'admin@codelab.ai',
      password: 'password',
    }

    expect(() => User.create(data)).not.toThrowError()
  })

  it('builds from update data', () => {
    const data = {
      id: uuidv4(),
      email: 'admin@codelab.ai',
    }

    expect(() => User.dto(data)).not.toThrowError()
  })
})
