import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test, TestingModule } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { CreateUserCommand } from '../../commands/CreateUserCommand'
import { UserUseCaseDto } from '../UserUseCaseDto'
import { TestInfrastructureModule } from '@codelab/backend'

describe('CreateUserRequest', () => {
  let userModule: TestingModule
  let commandBus: CommandBus

  beforeAll(async () => {
    userModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    await userModule.init()

    commandBus = userModule.select(CqrsModule).get(CommandBus)
  })

  afterAll(async () => {
    const connection = userModule.get(Connection)

    await connection.close()
    await userModule.close()
  })

  it('returns a user as command request', async () => {
    const results: UserUseCaseDto = await commandBus.execute(
      new CreateUserCommand({
        email: 'admin@codelab.ai',
        password: 'password',
      }),
    )

    expect(results).toStrictEqual<any>({
      email: 'admin@codelab.ai',
    })
  })

  it('should throw error on invalid email', () => {
    const execute = commandBus.execute(
      new CreateUserCommand({
        email: 'notanemail',
        password: 'password',
      }),
    )

    expect(execute).rejects.toThrowError('Email must be valid')
  })

  // it('throws an error when an email is taken', async () => {
  //   const commandBus: CommandBus = userModule.select(CqrsModule).get(CommandBus)

  //   const results: UserUseCaseDto = await commandBus.execute(
  //     new CreateUserCommand({
  //       email: 'admin@codelab.ai',
  //       password: 'password',
  //     }),
  //   )

  //   expect(results).toMatchObject({
  //     email: 'admin@codelab.ai',
  //     password: 'password',
  //   })
  // })

  // it('validates the request', () => {
  //   const email = new UserEmail({ value: 'admin@codelab.ai' })
  //   const password = new UserPassword({ value: 'password' })
  //   const user = new User({ email, password })

  //   const serializedUser = classToPlain(user)

  //   expect(serializedUser).toMatchObject({
  //     email: 'admin@codelab.ai',
  //     password: 'password',
  //   })
  // })
})
