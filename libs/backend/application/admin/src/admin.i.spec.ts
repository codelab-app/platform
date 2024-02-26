import { SharedApplicationModule } from '@codelab/backend/application/shared'
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
  NEO4J_DRIVER_PROVIDER,
  Neo4jModule,
  Neo4jService,
  OgmModule,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import {
  RequestContextMiddleware,
  RequestContextModule,
} from '@codelab/backend/infra/adapter/request-context'
import { initUserContext } from '@codelab/backend/test'
import { IAtomType } from '@codelab/shared/abstract/core'
import { auth0IdToken } from '@codelab/shared/data/test'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import type { INestApplication } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import type { GraphQLSchema } from 'graphql'
import { AdminApplicationModule } from './admin.application.module'
import { SeederApplicationService } from './use-case'

/**
 * Here we show how to mock a user
 */
describe('Admin', () => {
  let ogmService: OgmService
  let seederApplicationService: SeederApplicationService

  const context = initUserContext({
    imports: [
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
      AdminApplicationModule,
      SharedApplicationModule,
      TypeDomainModule,
      TypeApplicationModule,
      Neo4jModule,
    ],
    providers: [AuthDomainService, ImportSystemTypesHandler],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    seederApplicationService = module.get(SeederApplicationService)
    ogmService = module.get(OgmService)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('fetch dependent types for an element', async () => {
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
  })
})
