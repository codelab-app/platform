import {
  ReadAdminDataService,
  SharedApplicationModule,
} from '@codelab/backend/application/shared'
import {
  ImportSystemTypesHandler,
  TypeApplicationModule,
} from '@codelab/backend/application/type'
import {
  AuthDomainService,
  mapAuth0IdTokenToUserDto,
} from '@codelab/backend/domain/shared/auth'
import { TypeDomainModule, TypeFactory } from '@codelab/backend/domain/type'
import {
  GRAPHQL_SCHEMA_PROVIDER,
  GraphQLSchemaModule,
  Neo4jModule,
  Neo4jService,
  OgmModule,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import {
  RequestContextMiddleware,
  RequestContextModule,
} from '@codelab/backend/infra/adapter/request-context'
import { IAtomType } from '@codelab/shared/abstract/core'
import { auth0IdToken } from '@codelab/shared/data/test'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import type { INestApplication } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, type TestingModule } from '@nestjs/testing'
import type { GraphQLSchema } from 'graphql'
import { AdminApplicationModule } from './admin.application.module'
import { SeederApplicationService } from './use-case'

const mockRequest = {
  user: auth0IdToken,
}

/**
 * Here we show how to mock a user
 */
describe('Admin', () => {
  let app: INestApplication
  let neo4jService: Neo4jService
  let ogmService: OgmService
  let seederApplicationService: SeederApplicationService
  let requestContextMiddleware: RequestContextMiddleware
  let authDomainService: AuthDomainService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RequestContextModule,
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          imports: [GraphQLSchemaModule],
          inject: [GRAPHQL_SCHEMA_PROVIDER],
          useFactory: async (graphqlSchema: GraphQLSchema) => {
            return {
              schema: graphqlSchema,
            }
          },
        }),
        CqrsModule,
        AdminApplicationModule,
        TypeDomainModule,
        TypeApplicationModule,
        Neo4jModule,
        SharedApplicationModule,
        OgmModule,
      ],
      providers: [
        AuthDomainService,
        ImportSystemTypesHandler,
        TypeFactory,
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile()

    seederApplicationService = module.get(SeederApplicationService)
    authDomainService = module.get(AuthDomainService)
    requestContextMiddleware = module.get(RequestContextMiddleware)
    neo4jService = module.get(Neo4jService)
    ogmService = module.get(OgmService)

    app = module.createNestApplication()

    /**
     * Need this for the CQRS handler to be loaded
     *
     * https://github.com/nestjs/cqrs/issues/119#issuecomment-1181596376
     */
    // await module.init()
    await app.init()
  })

  beforeEach(async () => {
    await neo4jService.resetData()
  })

  /**
   * This is an example of how to mock request an
   */
  it('can set a user on the request context', (done) => {
    requestContextMiddleware.use(mockRequest, {}, async () => {
      try {
        const currentUser = authDomainService.currentUser
        const userDto = mapAuth0IdTokenToUserDto(auth0IdToken)

        expect(currentUser).toMatchObject(userDto)

        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('fetch dependent types for an element', (done) => {
    requestContextMiddleware.use(mockRequest, {}, async () => {
      try {
        await seederApplicationService.seedDataForElementDependentTypesResolver()

        /**
         * First seed all the data
         */
        const users = await ogmService.User.find({})
        const atoms = await ogmService.Atom.find({})
        const types = await ogmService.InterfaceType.find({})

        expect(users.length).toBe(1)
        expect(atoms.length).toBe(1)

        // We only seed 1 atom, so only 1 api type
        expect(types.length).toBe(1)
        expect(types[0]?.name).toBe(`${IAtomType.AntDesignButton} API`)

        /**
         * Then create a test app with a page
         */

        done()
      } catch (error) {
        done(error)
      }
    })
  })
})
