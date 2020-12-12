import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { QueryFailedError, Repository } from 'typeorm'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { ApolloCodelabError } from '../../app/filters/ApolloCodelabError'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { UserInput } from './UserInput'
import { UserEntity } from './user.entity'
import { UserModule } from './user.module'
import { UserService } from './user.service'
import {
  ConfigModule,
  ConfigTypeormService,
} from '@codelab/alpha/api/providers/config'

const email = 'codelab@gmail.com'
const password = 'password'

describe.skip('UserService', () => {
  let userService: UserService
  let repository: Repository<UserEntity>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UserModule,
        AuthModule,
        ConfigModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: ConfigTypeormService,
          inject: [ConfigService],
        }),
      ],
      providers: [UserService, AuthService],
    }).compile()

    userService = module.get<UserService>(UserService)
    // https://github.com/nestjs/nest/issues/176
    userService.onModuleInit()
    repository = module.get('UserEntityRepository')
  })

  afterEach(async () => {
    await repository.query(`DELETE FROM users; COMMIT;`)
  })

  it('Should handle password hashing when creating an account', async () => {
    const newUser = await userService.createNewUser({ email, password })
    const compare = await bcrypt.compare(password, newUser.password)

    expect(newUser.email).toEqual(email)
    expect(compare).toBeTruthy()
  })

  it('Should throw Error if user exists', async () => {
    await repository.save(repository.create({ email, password }))
    await expect(
      userService.createNewUser({ email, password }),
    ).rejects.toThrowError(QueryFailedError)
  })

  it('Should throw error if user is not found during Login', async () => {
    await repository.save(repository.create({ email, password }))
    const userInput: UserInput = {
      email: 'john@gmail.com',
      password: '1234',
    }

    await expect(userService.login(userInput)).rejects.toThrowError(
      EntityNotFoundError,
    )
  })

  it('Should throw error if password is wrong during Login', async () => {
    await repository.save(repository.create({ email, password }))
    const userInput: UserInput = {
      email,
      password: '1234',
    }

    await expect(userService.login(userInput)).rejects.toThrowError(
      ApolloCodelabError,
    )
  })

  it('Should login with correct credentials', async () => {
    await repository.save(repository.create({ email, password }))
    const userInput: UserInput = {
      email,
      password,
    }

    await expect(userService.login(userInput)).resolves.toBeDefined()
  })

  // Teardown, otherwise Jest does not exit
  afterAll(async () => {
    await repository.manager.connection.close()
  })
})
