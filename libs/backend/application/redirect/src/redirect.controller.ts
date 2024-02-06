import { RedirectRepository } from '@codelab/backend/domain/redirect'
import { safeEval } from '@codelab/backend/shared/util'
import type { IResourceFetchConfig } from '@codelab/shared/abstract/core'
import {
  ICanActivate,
  IPageKind,
  IRedirectTargetType,
} from '@codelab/shared/abstract/core'
import { getResourceClient } from '@codelab/shared/domain/mapper'
import { evaluateObject, tryParse } from '@codelab/shared/utils'
import { Body, Controller, Post } from '@nestjs/common'

@Controller()
export class CanActivateController {
  constructor(private redirectRepository: RedirectRepository) {}

  @Post('can-activate')
  async canActivate(@Body() { authorization, domain, pageUrl }: ICanActivate) {
    const redirect = await this.redirectRepository.findOne({
      source: {
        AND: [
          { app: { domains_SINGLE: { name: domain } } },
          { url: pageUrl },
          // system page doesn't have auth guard
          { kind: IPageKind.Regular },
        ],
      },
    })

    // either a regular page with no redirect attached to or a system page
    if (!redirect) {
      return { canActivate: true, status: 200 }
    }

    const { authGuard, targetPage, targetType } = redirect
    const isPage = targetType === IRedirectTargetType.Page && targetPage?.url

    const redirectUrl = isPage
      ? new URL(targetPage.url, domain).toString()
      : redirect.targetUrl

    // there is an auth guard to protect the page but not authorization is provided
    // no benefit from running auth guard without user specific info
    if (!authorization) {
      return {
        canActivate: false,
        message: 'Messing authorization in request body',
        redirectUrl,
        status: 200,
      }
    }

    const { config, resource, responseTransformer } = authGuard
    const resourceConfig = tryParse(resource.config.data)
    const client = getResourceClient(resource.type, resourceConfig)
    const fetchConfig = tryParse(config.data)

    const evaluatedConfig = evaluateObject(fetchConfig, {
      cookie: authorization,
    }) as IResourceFetchConfig

    let response

    try {
      response = await client.fetch(evaluatedConfig)
    } catch (error) {
      return {
        canActivate: false,
        message: `Failed to call "${resource.name}"`,
        redirectUrl,
        status: 500,
      }
    }

    try {
      const canActivate = await safeEval(responseTransformer, response)

      return {
        canActivate,
        redirectUrl: !canActivate ? redirectUrl : undefined,
        status: 200,
      }
    } catch (error) {
      return {
        canActivate: false,
        message: `Unable to transform response`,
        redirectUrl,
        status: 500,
      }
    }
  }
}
