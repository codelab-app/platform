import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  type INodeType,
  type IRedirectDto,
  IRedirectTargetType,
} from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  disconnectAll,
  reconnectNodeId,
} from '@codelab/shared/domain/orm'
import {
  type RedirectOptions,
  type RedirectWhere,
} from '@codelab/shared/infra/gqlgen'
import { RedirectFragment } from '@codelab/shared/infra/gqlgen'
import { redirectApi } from '@codelab/shared-domain-module/redirect'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RedirectRepository extends AbstractRepository<
  INodeType.Redirect,
  IRedirectDto,
  RedirectFragment,
  RedirectWhere,
  RedirectOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(redirects: Array<IRedirectDto>) {
    const {
      createRedirects: { redirects: createdRedirects },
    } = await redirectApi().CreateRedirects({
      input: redirects.map((redirect) => ({
        authGuard: connectNodeId(redirect.authGuard.id),
        id: redirect.id,
        source: connectNodeId(redirect.source.id),
        targetPage:
          redirect.targetType === IRedirectTargetType.Page
            ? reconnectNodeId(redirect.targetPage?.id)
            : undefined,
        targetType: redirect.targetType,
        targetUrl:
          redirect.targetType === IRedirectTargetType.Url
            ? redirect.targetType
            : undefined,
      })),
    })

    return createdRedirects
  }

  protected async _find({
    options,
    where,
  }: {
    where?: RedirectWhere
    options?: RedirectOptions
  }) {
    const { items } = await redirectApi().GetRedirects({
      options,
      where,
    })

    return items
  }

  protected async _update({
    authGuard,
    source,
    targetPage,
    targetType,
    targetUrl,
  }: IRedirectDto) {
    const {
      updateRedirects: { redirects },
    } = await redirectApi().UpdateRedirects({
      update: {
        authGuard: reconnectNodeId(authGuard.id),
        source: reconnectNodeId(source.id),
        targetPage:
          targetType === IRedirectTargetType.Page
            ? reconnectNodeId(targetPage?.id)
            : disconnectAll({ omitId: targetPage?.id }),
        targetType,
        targetUrl:
          targetType === IRedirectTargetType.Url ? targetUrl : undefined,
      },
    })

    return redirects[0]
  }
}
