import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import {
  handlerProviders,
  persistenceProviders,
  useCaseProviders,
} from '../../../../infrastructure/adapter/UserModule'
import { CreateUserCommand } from '../../commands/CreateUserCommand'
import {
  TestTypeOrmModule,
  TypeOrmUser,
} from '@codelab/ddd/shared/infrastructure'

describe('CreateUserUseCase', () => {
  let userModule: any

  beforeAll(async () => {
    userModule = await Test.createTestingModule({
      imports: [
        TestTypeOrmModule,
        CqrsModule,
        TypeOrmModule.forFeature([TypeOrmUser]),
      ],
      providers: [
        ...persistenceProviders,
        ...useCaseProviders,
        ...handlerProviders,
      ],
    }).compile()

    await userModule.init()
  })

  it('throws an error when an email is taken', async () => {
    const commandBus: CommandBus = userModule.select(CqrsModule).get(CommandBus)

    const results = await commandBus.execute(
      new CreateUserCommand({
        email: 'admin@codelab.ai',
        password: 'password',
      }),
    )

    expect(results).toBeTruthy()
  })

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
  afterAll(() => {
    const connection = userModule.get(Connection)

    connection.close()
  })
})
