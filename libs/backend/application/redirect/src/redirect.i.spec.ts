import { AuthGuard } from '@codelab/backend/domain/auth-guard'
import { Redirect, RedirectRepository } from '@codelab/backend/domain/redirect'
import { Resource } from '@codelab/backend/domain/resource'
import type {
  IRef,
  IResourceConfigData,
  IRestFetchConfigData,
} from '@codelab/shared/abstract/core'
import {
  HttpMethod,
  HttpResponseType,
  IRedirectTargetType,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { ResourceRestClient } from '@codelab/shared/domain/mapper'
import { Test, type TestingModule } from '@nestjs/testing'
import { v4 } from 'uuid'
import { RedirectApplicationModule } from './redirect.application.module'
import { RedirectController } from './redirect.controller'

/**
 * Here we show how to mock a user
 */
describe('Redirect', () => {
  let redirectController: RedirectController
  let redirectRepository: RedirectRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedirectApplicationModule],
    }).compile()

    redirectController = module.get<RedirectController>(RedirectController)
    redirectRepository = module.get<RedirectRepository>(RedirectRepository)
  })

  it('should authorize page access when no redirect found', async () => {
    const response = await redirectController.canActivate({
      domain: 'test.com',
      pageUrl: '/some-url',
    })

    expect(response).toMatchObject({
      canActivate: true,
      message: 'No redirect found!',
      status: 200,
    })
  })

  it('should prevent page access when authorization cookie is missing', async () => {
    const domain = 'http://test.com'
    const pageUrl = '/page-url'

    const redirect = new Redirect({
      authGuard: { id: v4() },
      id: v4(),
      source: { id: v4() },
      // a workaround to quickly pass page url without create page model
      targetPage: { id: v4(), url: pageUrl } as IRef,
      targetType: IRedirectTargetType.Page,
    })

    jest.spyOn(redirectRepository, 'findOne').mockResolvedValue(redirect)

    const response = await redirectController.canActivate({
      domain,
      pageUrl,
    })

    expect(response).toMatchObject({
      canActivate: false,
      message: 'Messing authorization in request body',
      redirectUrl: `${domain}${pageUrl}`,
      status: 200,
    })
  })

  it('should authorize page access when auth api return true', async () => {
    const domain = 'http://test.com'
    const pageUrl = '/page-url'
    const authorization = 'authorization-token'

    const resource = new Resource({
      config: {
        data: JSON.stringify({
          url: 'resource-url',
        } as IResourceConfigData),
        id: v4(),
      },
      id: v4(),
      name: 'Resource',
      type: IResourceType.Rest,
    })

    const authGuard = new AuthGuard({
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
      resource,
      responseTransformer: 'return response.data.isLoggedIn;',
    })

    const redirect = new Redirect({
      authGuard,
      id: v4(),
      source: { id: v4() },
      // a workaround to quickly pass page url without create page model
      targetPage: { id: v4(), url: pageUrl } as IRef,
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
      pageUrl,
    })

    expect(response).toMatchObject({
      canActivate: true,
      status: 200,
    })
  })

  it('should prevent page access when auth api return false', async () => {
    const domain = 'http://test.com'
    const pageUrl = '/page-url'
    const authorization = 'authorization-token'

    const resource = new Resource({
      config: {
        data: JSON.stringify({
          url: 'resource-url',
        } as IResourceConfigData),
        id: v4(),
      },
      id: v4(),
      name: 'Resource',
      type: IResourceType.Rest,
    })

    const authGuard = new AuthGuard({
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
      resource,
      responseTransformer: 'return response.data.isLoggedIn;',
    })

    const redirect = new Redirect({
      authGuard,
      id: v4(),
      source: { id: v4() },
      // a workaround to quickly pass page url without create page model
      targetPage: { id: v4(), url: pageUrl } as IRef,
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
      pageUrl,
    })

    expect(response).toMatchObject({
      canActivate: false,
      redirectUrl: `${domain}${pageUrl}`,
      status: 200,
    })
  })
})
