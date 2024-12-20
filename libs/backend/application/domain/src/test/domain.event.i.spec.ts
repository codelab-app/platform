import type {
  AppCreateInput,
  DomainCreateInput,
} from '@codelab/shared/infra/gql'
import type { INestApplication } from '@nestjs/common'

import {
  GraphqlModule,
  GraphqlService,
} from '@codelab/backend/infra/adapter/graphql'
import { initUserContext } from '@codelab/backend/test'
import { userDto } from '@codelab/shared/data/test'
import { connectNodeId } from '@codelab/shared/domain/orm'
import { graphqlClient } from '@codelab/shared/infra/gql-client'
import { EventEmitterModule } from '@nestjs/event-emitter'
import * as env from 'env-var'
import { sleep } from 'radash'
import { v4 } from 'uuid'

import type {
  TestCreateDomainAppsMutationVariables,
  TestUpdateDomainsMutationVariables,
} from './domain.spec.graphql.api.gen'

import { DomainApplicationModule } from '../domain.application.module'
import { DomainListener } from '../listeners/domain.listener'
import { RegisterDomainListener } from '../listeners/register-domain.listener'
import {
  TestCreateDomainAppsDocument,
  TestCreateDomainsDocument,
  TestDeleteDomainsDocument,
  TestUpdateDomainsDocument,
} from './domain.spec.graphql.api.gen'

const apiPort = env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

describe('Domain subscriptions', () => {
  let app: INestApplication
  let graphqlService: GraphqlService
  let domainListener: DomainListener
  let registerDomainListener: RegisterDomainListener
  let domainCreatedSpy: jest.SpyInstance
  let domainUpdatedSpy: jest.SpyInstance
  let domainDeletedSpy: jest.SpyInstance

  const context = initUserContext({
    imports: [
      EventEmitterModule.forRoot(),
      GraphqlModule,
      DomainApplicationModule,
    ],
    providers: [GraphqlService],
  })

  let ctx: Awaited<ReturnType<typeof initUserContext>>

  beforeAll(async () => {
    ctx = await context
    app = ctx.nestApp
    app.enableShutdownHooks()
    graphqlService = ctx.module.get(GraphqlService)
    domainListener = ctx.module.get(DomainListener)
    registerDomainListener = ctx.module.get(RegisterDomainListener)

    await ctx.beforeAll()
    graphqlService.serverReadyHook()
    
    // Wait for subscriptions to be ready
    await sleep(500)
  })

  beforeEach(() => {
    domainCreatedSpy = jest.spyOn(domainListener, 'domainCreated').mockClear()
    domainUpdatedSpy = jest.spyOn(domainListener, 'domainUpdated').mockClear() 
    domainDeletedSpy = jest.spyOn(domainListener, 'domainDeleted').mockClear()
  })

  afterAll(async () => {
    if (ctx) {
      await ctx.afterAll()
    }
  })

  const appId = v4()
  const domainId = v4()

  it('should call the domain created subscription handler', async () => {
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
        id: domainId,
        name: 'codelab.app',
      },
    ]

    await graphqlClient.request<TestCreateDomainAppsMutationVariables>(
      TestCreateDomainAppsDocument,
      {
        input: appInput,
      },
    )

    await graphqlClient.request(TestCreateDomainsDocument, {
      input: domainInput,
    })

    // Wait for subscription to process
    await sleep(1000)

    expect(domainCreatedSpy).toHaveBeenCalled()
  })

  it('should call the domain updated subscription handler', async () => {
    await graphqlClient.request<TestUpdateDomainsMutationVariables>(
      TestUpdateDomainsDocument,
      {
        update: {
          name: 'codelab.com',
        },
        where: {
          id: domainId,
        },
      },
    )

    // Wait for subscription to process
    await sleep(1000)

    expect(domainUpdatedSpy).toHaveBeenCalled()
  })

  it('should call the domain deleted subscription handler', async () => {
    await graphqlClient.request(TestDeleteDomainsDocument, {
      where: {
        id: domainId,
      },
    })

    // Wait for subscription to process
    await sleep(1000)

    expect(domainDeletedSpy).toHaveBeenCalled()
  })
})
