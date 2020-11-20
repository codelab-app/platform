import * as bcrypt from 'bcrypt'
import { CodelabValidationError } from '../../app/filters/CodelabValidationError'
import { UserEntity } from './user.entity'

describe('UserEntity class', () => {
  it('Should hash password', async () => {
    const u = new UserEntity()

    u.email = 'codelab@gmail.com'
    u.password = 'password'
    await u.hashPassword()
    const compare = await bcrypt.compare('password', u.password)

    expect(compare).toBeTruthy()
    expect(u.email).toEqual('codelab@gmail.com')
  })

  it('Should compare password', async () => {
    const expectedHashedPassword =
      '$2b$10$oRsg3JaquCFAfeqqewFCAu87XycyF2PsxaFfH8ozylAmhRzf3Bwti'
    const u = new UserEntity()

    u.email = 'codelab@gmail.com'
    u.password = expectedHashedPassword
    const compareResult = u.comparePassword('password')

    expect(u.email).toEqual('codelab@gmail.com')
    expect(compareResult).toBeTruthy()
  })

  it('Should throw error given invalid email', async () => {
    const u = new UserEntity()

    u.email = 'random string'
    await expect(u.validate()).rejects.toThrowError(CodelabValidationError)
  })

  it('Should throw error if password is less then 3 characters', async () => {
    const u = new UserEntity()

    u.password = '12'
    await expect(u.validate()).rejects.toThrowError(CodelabValidationError)
  })

  it('Password can be empty', async () => {
    const u = new UserEntity()

    u.email = 'codelab@gmail.com'
    await expect(u.validate()).resolves.toBeUndefined()
  })
})
