import type {
  AppCreateInput,
  DomainCreateInput,
} from '@codelab/backend/abstract/codegen'
import type { INestApplication } from '@nestjs/common'

import {
  graphqlClient,
  GraphqlModule,
  GraphqlService,
} from '@codelab/backend/infra/adapter/graphql'
import { initUserContext } from '@codelab/backend/test'
import { userDto } from '@codelab/shared/data/test'
import { connectNodeId } from '@codelab/shared/domain/orm'
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
  let registerCreatedSubscriptionsSpy: jest.SpyInstance
  let registerDeletedSubscriptionsSpy: jest.SpyInstance
  let registerUpdatedSubscriptionsSpy: jest.SpyInstance

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

    domainListener = module.get(DomainListener)
    registerDomainListener = module.get(RegisterDomainListener)

    app = ctx.nestApp
    app.enableShutdownHooks()
    graphqlService = module.get(GraphqlService)

    await ctx.beforeAll()
    await app.listen(apiPort).then(() => {
      domainCreatedSpy = jest.spyOn(domainListener, 'domainCreated')
      domainUpdatedSpy = jest.spyOn(domainListener, 'domainUpdated')
      domainDeletedSpy = jest.spyOn(domainListener, 'domainDeleted')

      graphqlService.serverReadyHook()
    })
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  const appId = v4()
  const domainId = v4()

  it('should call the domain created subscription handler', async () => {
    await sleep(1000)

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

    expect(domainUpdatedSpy).toHaveBeenCalled()
  })

  it('should call the domain deleted subscription handler', async () => {
    await graphqlClient.request(TestDeleteDomainsDocument, {
      where: {
        id: domainId,
      },
    })

    expect(domainDeletedSpy).toHaveBeenCalled()
  })
})
