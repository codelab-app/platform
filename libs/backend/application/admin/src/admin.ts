import { SharedApplicationModule } from '@codelab/backend/application/shared'
import {
  ImportSystemTypesHandler,
  TypeApplicationModule,
} from '@codelab/backend/application/type'
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
import { auth0IdToken } from '@codelab/shared/data/test'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import { REQUEST } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, type TestingModule } from '@nestjs/testing'
import type { GraphQLSchema } from 'graphql'
import { AdminApplicationModule } from './admin.application.module'
import { SeederApplicationService } from './use-case'

/**
 * Here we show how to mock a user
 */
describe('Admin', () => {
  let neo4jService: Neo4jService
  let seederApplicationService: SeederApplicationService
  let requestContextMiddleware: RequestContextMiddleware
  let ogmService: OgmService

  const mockRequest = {
    user: auth0IdToken,
  }

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
        ImportSystemTypesHandler,
        TypeFactory,
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile()

    seederApplicationService = module.get(SeederApplicationService)
    requestContextMiddleware = module.get(RequestContextMiddleware)
    ogmService = module.get(OgmService)
    neo4jService = module.get(Neo4jService)

    /**
     * Need this for the CQRS handler to be loaded
     *
     * https://github.com/nestjs/cqrs/issues/119#issuecomment-1181596376
     */
    await module.init()
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
        await seederApplicationService.seedDataForElementDependentTypesResolver()

        const users = await ogmService.User.find({})
        // const atoms = await ogmService.Atom.find({})
        // const types = await ogmService.InterfaceType.find({})

        expect(users.length).toBe(1)
        // expect(atoms.length).toBe(1)

        // // We only seed 1 atom, so only 1 api type
        // expect(types.length).toBe(1)
        // expect(types[0]?.name).toBe(`${IAtomType.AntDesignButton} API`)
        expect(users)

        done()
      } catch (error) {
        done(error)
      }
    })
  })
})
