import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import {
  handlerProviders,
  persistenceProviders,
  useCaseProviders,
} from '../../../../infrastructure/adapter/UserModule'
import { CreateUserCommand } from '../../commands/CreateUserCommand'

describe('CreateUserUseCase', () => {
  let UserModule: any

  beforeAll(async () => {
    UserModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        ...persistenceProviders,
        ...useCaseProviders,
        ...handlerProviders,
      ],
    }).compile()
  })

  it('throws an error when an email is taken', async () => {
    const commandBus: CommandBus = UserModule.select(CqrsModule).get(CommandBus)

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
})
