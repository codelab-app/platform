import type { DomainCreateInput } from '@codelab/backend/abstract/codegen'
import { setupTestingContext } from '@codelab/backend/infra/adapter/graphql'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { OgmService } from '@codelab/backend/infra/adapter/neo4j'
import type { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'
import { DomainDomainModule } from '../domain.domain.module'
import { TestCreateDomains } from './domain.spec.graphql.gen'

describe('Domain subscriptions', () => {
  let app: INestApplication
  let ogmService: OgmService

  const context = setupTestingContext({
    imports: [CodelabLoggerModule, DomainDomainModule],
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
    const input: Array<DomainCreateInput> = [
      {
        id: v4(),
        name: 'www.codelab.app',
      },
    ]

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(TestCreateDomains),
        variable: { input },
      })
      .then((res) => {
        console.log(res.body)
      })
  })
})
