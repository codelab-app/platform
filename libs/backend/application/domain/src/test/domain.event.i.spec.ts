import type {
  AppCreateInput,
  DomainCreateInput,
} from '@codelab/backend/abstract/codegen'
import {
  graphqlClient,
  GraphqlModule,
  GraphqlService,
} from '@codelab/backend/infra/adapter/graphql'
import { initUserContext } from '@codelab/backend/test'
import type {
  TestCreateDomainAppsMutationVariables,
  TestUpdateDomainsMutationVariables,
} from '@codelab/shared/infra/gql'
import { userDto } from '@codelab/shared/data/test'
import { connectNodeId } from '@codelab/shared/domain'
import type { INestApplication } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import * as env from 'env-var'
import { v4 } from 'uuid'
import { DomainApplicationModule } from '../domain.application.module'
import { DomainListener } from '../listeners/domain.listener'
import {
  TestCreateDomainApps,
  TestCreateDomains,
  TestDeleteDomains,
  TestUpdateDomains,
} from './domain.spec.graphql.gen'

const apiPort = env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

describe('Domain subscriptions', () => {
  let app: INestApplication
  let graphqlService: GraphqlService
  let domainListener: DomainListener
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

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    domainListener = module.get(DomainListener)

    app = ctx.nestApp
    app.enableShutdownHooks()
    graphqlService = module.get(GraphqlService)

    await ctx.beforeAll()
    await app.listen(apiPort).then(() => {
      domainCreatedSpy = jest.spyOn(domainListener, 'domainCreated')
      domainUpdatedSpy = jest.spyOn(domainListener, 'domainUpdated')
      domainDeletedSpy = jest.spyOn(domainListener, 'domainDeleted')

      graphqlService.emitServerReady()
    })
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
      TestCreateDomainApps,
      {
        input: appInput,
      },
    )

    await graphqlClient.request(TestCreateDomains, {
      input: domainInput,
    })

    expect(domainCreatedSpy).toHaveBeenCalled()
  })

  it('should call the domain updated subscription handler', async () => {
    await graphqlClient.request<TestUpdateDomainsMutationVariables>(
      TestUpdateDomains,
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
    await graphqlClient.request(TestDeleteDomains, {
      where: {
        id: domainId,
      },
    })

    expect(domainDeletedSpy).toHaveBeenCalled()
  })
})
