import type {
  AppCreateInput,
  DomainCreateInput,
} from '@codelab/backend/abstract/codegen'
import { DomainDomainModule } from '@codelab/backend/domain/domain'
import {
  graphqlClient,
  GraphqlModule,
  GraphqlService,
} from '@codelab/backend/infra/adapter/graphql'
import { initUserContext } from '@codelab/backend/test'
import { userDto } from '@codelab/shared/data/test'
import { connectNodeId } from '@codelab/shared/domain'
import type { INestApplication } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { domain } from 'dots-wrapper/dist/modules'
import * as env from 'env-var'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'
import { DomainApplicationModule } from '../domain.application.module'
import { DomainApplicationService } from '../domain.application.service'
import {
  TestCreateDomainApps,
  TestCreateDomains,
} from './domain.spec.graphql.gen'

const apiPort = env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

describe('Domain subscriptions', () => {
  let app: INestApplication
  let graphqlService: GraphqlService
  let domainService: DomainApplicationService
  let subscribeToServerSpy: jest.SpyInstance

  const context = initUserContext({
    imports: [
      EventEmitterModule.forRoot(),
      GraphqlModule,
      DomainApplicationModule,
    ],
    providers: [GraphqlService],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    domainService = module.get(DomainApplicationService)

    app = ctx.nestApp
    app.enableShutdownHooks()
    graphqlService = module.get(GraphqlService)

    await ctx.beforeAll()
    await app.listen(apiPort).then(() => {
      subscribeToServerSpy = jest.spyOn(domainService, 'subscribeToServer')
      graphqlService.emitServerReady()
    })
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

    await graphqlClient
      .request(TestCreateDomainApps, {
        input: appInput,
      })
      .then((res) => {
        console.log(res)
      })

    await graphqlClient
      .request(TestCreateDomains, {
        input: domainInput,
      })
      .then((res) => {
        console.log(res)
      })

    expect(subscribeToServerSpy).toHaveBeenCalled()
  })
})
