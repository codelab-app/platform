import type {
  AppCreateInput,
  DomainCreateInput,
} from '@codelab/shared/infra/gqlgen'
import type { INestApplication } from '@nestjs/common'

import { GraphqlService } from '@codelab/backend/infra/adapter/graphql'
import { initUserContext } from '@codelab/backend/test/setup'
import { userDto } from '@codelab/shared/data/test'
import { connectNodeId } from '@codelab/shared/domain/orm'
import { graphqlClient } from '@codelab/shared/infra/gql-client'
import { EventEmitterModule } from '@nestjs/event-emitter'
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

describe('Domain subscriptions', () => {
  let app: INestApplication
  let graphqlService: GraphqlService
  let domainListener: DomainListener
  let registerDomainListener: RegisterDomainListener
  let domainCreatedSpy: jest.SpyInstance
  let domainUpdatedSpy: jest.SpyInstance
  let domainDeletedSpy: jest.SpyInstance

  const context = initUserContext({
    imports: [EventEmitterModule.forRoot(), DomainApplicationModule],
    providers: [GraphqlService],
  })

  const SLEEP_TIMEOUT = 1000

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    domainListener = module.get(DomainListener)
    registerDomainListener = module.get(RegisterDomainListener)

    app = ctx.nestApp
    app.enableShutdownHooks()
    graphqlService = module.get(GraphqlService)

    await ctx.beforeAll()

    domainCreatedSpy = jest.spyOn(domainListener, 'domainCreated')
    domainUpdatedSpy = jest.spyOn(domainListener, 'domainUpdated')
    domainDeletedSpy = jest.spyOn(domainListener, 'domainDeleted')

    graphqlService.serverReadyHook()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
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

    const data = await graphqlClient.request(TestCreateDomainsDocument, {
      input: domainInput,
    })

    await sleep(SLEEP_TIMEOUT)

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

    await sleep(SLEEP_TIMEOUT)

    expect(domainUpdatedSpy).toHaveBeenCalled()
  })

  it('should call the domain deleted subscription handler', async () => {
    await graphqlClient.request(TestDeleteDomainsDocument, {
      where: {
        id: domainId,
      },
    })

    await sleep(SLEEP_TIMEOUT)

    expect(domainDeletedSpy).toHaveBeenCalled()
  })
})
