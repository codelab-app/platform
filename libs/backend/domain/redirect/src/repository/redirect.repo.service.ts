import {
  type Redirect,
  type RedirectOptions,
  type RedirectWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  redirectSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  IRedirectTargetType,
  type IRedirectDTO,
} from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  disconnectAll,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RedirectRepository extends AbstractRepository<
  IRedirectDTO,
  Redirect,
  RedirectWhere,
  RedirectOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService)
  }

  protected async _add(redirects: Array<IRedirectDTO>) {
    return (
      await (
        await this.ogmService.Redirect
      ).create({
        input: redirects.map((redirect) => ({
          id: redirect.id,
          targetType: redirect.targetType,
          authGuard: connectNodeId(redirect.authGuard.id),
          source: connectNodeId(redirect.source.id),
          targetPage:
            redirect.targetType === IRedirectTargetType.Page
              ? reconnectNodeId(redirect.targetPage?.id)
              : undefined,

          targetUrl:
            redirect.targetType === IRedirectTargetType.Url
              ? redirect.targetType
              : undefined,
        })),
      })
    ).redirects
  }

  protected async _find({
    options,
    where,
  }: {
    where?: RedirectWhere
    options?: RedirectOptions
  }) {
    return await (
      await this.ogmService.Redirect
    ).find({
      options,
      selectionSet: `{ ${redirectSelectionSet} }`,
      where,
    })
  }

  protected async _update({
    authGuard,
    source,
    targetType,
    targetPage,
    targetUrl,
  }: IRedirectDTO) {
    return (
      await (
        await this.ogmService.Redirect
      ).update({
        update: {
          authGuard: reconnectNodeId(authGuard.id),
          source: reconnectNodeId(source.id),
          targetType,
          targetPage:
            targetType === IRedirectTargetType.Page
              ? reconnectNodeId(targetPage?.id)
              : disconnectAll(),
          targetUrl:
            targetType === IRedirectTargetType.Url ? targetUrl : undefined,
        },
      })
    ).redirects[0]
  }
}
