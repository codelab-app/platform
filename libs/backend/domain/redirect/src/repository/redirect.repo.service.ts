import {
  type Redirect,
  type RedirectOptions,
  type RedirectWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  OgmService,
  redirectSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  type IRedirectDTO,
  IRedirectTargetType,
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

  protected async _addMany(redirects: Array<IRedirectDTO>) {
    return (
      await (
        await this.ogmService.Redirect
      ).create({
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
    targetPage,
    targetType,
    targetUrl,
  }: IRedirectDTO) {
    return (
      await (
        await this.ogmService.Redirect
      ).update({
        update: {
          authGuard: reconnectNodeId(authGuard.id),
          source: reconnectNodeId(source.id),
          targetPage:
            targetType === IRedirectTargetType.Page
              ? reconnectNodeId(targetPage?.id)
              : disconnectAll(),
          targetType,
          targetUrl:
            targetType === IRedirectTargetType.Url ? targetUrl : undefined,
        },
      })
    ).redirects[0]
  }
}
