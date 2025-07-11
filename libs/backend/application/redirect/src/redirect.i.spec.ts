import type {
  IRef,
  IResourceConfigData,
  IRestFetchConfigData,
} from '@codelab/shared-abstract-core'

import { Redirect, RedirectRepository } from '@codelab/backend-domain-redirect'
import { CodelabLoggerModule } from '@codelab/backend-infra-adapter-logger'
import { initUserContext } from '@codelab/backend-test-setup'
import {
  HttpMethod,
  HttpResponseType,
  IRedirectTargetType,
  IResourceType,
} from '@codelab/shared-abstract-core'
import { ResourceRestClient } from '@codelab/shared-domain-module-resource'
import { v4 } from 'uuid'

import { RedirectApplicationModule } from './redirect.application.module'
import { RedirectController } from './redirect.controller'

/**
 * Here we show how to mock a user
 */
describe('Redirect', () => {
  let redirectController: RedirectController
  let redirectRepository: RedirectRepository

  const context = initUserContext({
    imports: [RedirectApplicationModule, CodelabLoggerModule],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    redirectController = module.get<RedirectController>(RedirectController)
    redirectRepository = module.get<RedirectRepository>(RedirectRepository)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should authorize page access when no redirect found', async () => {
    const response = await redirectController.canActivate({
      domain: 'test.com',
      pageUrlPattern: '/some-url',
    })

    expect(response).toMatchObject({
      canActivate: true,
      message: 'No redirect found!',
      status: 200,
    })
  })

  it('should prevent page access when authorization cookie is missing', async () => {
    const domain = 'http://test.com'
    const pageUrlPattern = '/page-url'

    const redirect = new Redirect({
      authGuard: { id: v4() },
      id: v4(),
      source: { id: v4() },
      // a workaround to quickly pass page url without create page model
      targetPage: { id: v4(), urlPattern: pageUrlPattern } as IRef,
      targetType: IRedirectTargetType.Page,
    })

    jest.spyOn(redirectRepository, 'findOne').mockResolvedValue(redirect)

    const response = await redirectController.canActivate({
      domain,
      pageUrlPattern,
    })

    expect(response).toMatchObject({
      canActivate: false,
      message: 'Missing authorization in request body',
      redirectUrl: `${domain}${pageUrlPattern}`,
      status: 200,
    })
  })

  it('should authorize page access when auth api return true', async () => {
    const owner = { id: v4() }
    const domain = 'http://test.com'
    const pageUrlPattern = '/page-url'
    const authorization = 'authorization-token'

    const resource = {
      config: {
        data: JSON.stringify({
          url: 'resource-url',
        } as IResourceConfigData),
        id: v4(),
      },
      id: v4(),
      name: 'Resource',
      owner,
      type: IResourceType.Rest,
    }

    const authGuard = {
      config: {
        data: JSON.stringify({
          headers: {},
          method: HttpMethod.GET,
          queryParams: {},
          responseType: HttpResponseType.Json,
          urlSegment: '/',
        } as IRestFetchConfigData),
        id: v4(),
      },
      id: v4(),
      name: 'Auth Guard',
      owner,
      resource,
      responseTransformer: 'return response.data.isLoggedIn;',
    }

    const redirect = new Redirect({
      authGuard,
      id: v4(),
      source: { id: v4() },
      // a workaround to quickly pass page url without create page model
      targetPage: { id: v4(), urlPattern: pageUrlPattern } as IRef,
      targetType: IRedirectTargetType.Page,
    })

    jest.spyOn(redirectRepository, 'findOne').mockResolvedValue(redirect)

    jest.spyOn(ResourceRestClient.prototype, 'fetch').mockResolvedValue({
      data: {
        isLoggedIn: true,
      },
    })

    const response = await redirectController.canActivate({
      authorization,
      domain,
      pageUrlPattern,
    })

    expect(response).toMatchObject({
      canActivate: true,
      status: 200,
    })
  })

  it('should prevent page access when auth api return false', async () => {
    const owner = { id: v4() }
    const domain = 'http://test.com'
    const pageUrlPattern = '/page-url'
    const authorization = 'authorization-token'

    const resource = {
      config: {
        data: JSON.stringify({
          url: 'resource-url',
        } as IResourceConfigData),
        id: v4(),
      },
      id: v4(),
      name: 'Resource',
      owner,
      type: IResourceType.Rest,
    }

    const authGuard = {
      config: {
        data: JSON.stringify({
          headers: {},
          method: HttpMethod.GET,
          queryParams: {},
          responseType: HttpResponseType.Json,
          urlSegment: '/',
        } as IRestFetchConfigData),
        id: v4(),
      },
      id: v4(),
      name: 'Auth Guard',
      owner,
      resource,
      responseTransformer: 'return response.data.isLoggedIn;',
    }

    const redirect = new Redirect({
      authGuard,
      id: v4(),
      source: { id: v4() },
      // a workaround to quickly pass page url without create page model
      targetPage: { id: v4(), urlPattern: pageUrlPattern } as IRef,
      targetType: IRedirectTargetType.Page,
    })

    jest.spyOn(redirectRepository, 'findOne').mockResolvedValue(redirect)

    jest.spyOn(ResourceRestClient.prototype, 'fetch').mockResolvedValue({
      data: {
        isLoggedIn: false,
      },
    })

    const response = await redirectController.canActivate({
      authorization,
      domain,
      pageUrlPattern,
    })

    expect(response).toMatchObject({
      canActivate: false,
      redirectUrl: `${domain}${pageUrlPattern}`,
      status: 200,
    })
  })
})
