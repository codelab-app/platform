import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { QueryFailedError, Repository } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { PSQLErrorCode } from '../../app/filters/general-exception.filter'
import { EdgeEntity } from '../edge/edge.entity'
import { GraphEntity } from '../graph/graph.entity'
import { VertexEntity } from '../vertex/vertex.entity'
import { UserEntity } from './user.entity'
import { UserModule } from './user.module'
import { UserService } from './user.service'

describe('UserService', () => {
  let userService: UserService
  let repository: Repository<UserEntity>

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5431,
          username: 'postgres',
          password: 'postgrespassword',
          database: 'postgres',
          entities: [UserEntity, GraphEntity, VertexEntity, EdgeEntity],
          synchronize: true,
          dropSchema: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
      ],
      providers: [UserService],
    }).compile()

    userService = module.get<UserService>(UserService)
    repository = module.get('UserEntityRepository')
  })

  afterEach(async () => {
    await repository.query(`DELETE FROM "user"; COMMIT;`)
  })

  it('Should handle password hashing when creating an account', async () => {
    const email = 'codelab@gmail.com'
    const password = 'password'
    const u = new UserEntity()

    u.email = email
    u.password = password

    const newUser = await userService.createNewUser({ email, password })
    const compare = await bcrypt.compare(password, newUser.password)

    expect(newUser.email).toEqual(email)
    expect(compare).toBeTruthy()
  })

  it('Should throw Error if user exists', async () => {
    const email = 'codelab@gmail.com'
    const password = 'password'

    await repository.save(repository.create({ email, password }))

    try {
      await userService.createNewUser({ email, password })
    } catch (e) {
      expect(e.code).toEqual(PSQLErrorCode.DUPLICATE_KEY_VIOLATION)
      expect(e).toBeInstanceOf(QueryFailedError)
    }
  })

  // Teardown, otherwise Jest does not exit
  afterAll(async () => {
    await repository.manager.connection.close()
  })
})
