import type {
  AppCreateInput,
  DomainCreateInput,
} from '@codelab/backend/abstract/codegen'
import {
  nestGraphqlModule,
  setupTestingContext,
} from '@codelab/backend/infra/adapter/graphql'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { Neo4jModule, OgmService } from '@codelab/backend/infra/adapter/neo4j'
import { initUserContext } from '@codelab/backend/test'
import { userDto } from '@codelab/shared/data/test'
import { connectNodeId } from '@codelab/shared/domain'
import type { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'
import { DomainDomainModule } from '../domain.domain.module'
import {
  TestCreateDomainApps,
  TestCreateDomains,
} from './domain.spec.graphql.gen'

describe('Domain subscriptions', () => {
  let app: INestApplication
  let ogmService: OgmService

  const context = initUserContext({
    imports: [nestGraphqlModule, Neo4jModule, DomainDomainModule],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    app = ctx.nestApp
    ogmService = module.get(OgmService)

    await ctx.beforeAll()
    await app.listen(4001)
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should call the domain created subscription handler', async () => {
    const appId = v4()

    const appInput: Array<AppCreateInput> = [
      {
        compositeKey: `${userDto.id}-demo-app`,
        id: appId,
        owner: connectNodeId(userDto.id),
      },
    ]

    const domainInput: Array<DomainCreateInput> = [
      {
        app: connectNodeId(appId),
        id: v4(),
        name: 'www.codelab.app',
      },
    ]

    // Create app first
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(TestCreateDomainApps),
        variables: { input: appInput },
      })
      .then((res) => {
        console.log(res.body)
      })

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(TestCreateDomains),
        variables: { input: domainInput },
      })
      .then((res) => {
        console.log(res.body)
      })
  })
})
