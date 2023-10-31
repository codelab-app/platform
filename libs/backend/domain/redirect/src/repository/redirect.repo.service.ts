import {
  type Redirect,
  type RedirectOptions,
  type RedirectWhere,
} from '@codelab/backend/abstract/codegen'
import type { OgmService } from '@codelab/backend/infra/adapter/neo4j'
import { redirectSelectionSet } from '@codelab/backend/infra/adapter/neo4j'
import type { TraceService } from '@codelab/backend/infra/adapter/otel'
import type { ValidationService } from '@codelab/backend/infra/adapter/typebox'
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
  ) {
    super(traceService, validationService)
  }

  protected async _add(redirects: Array<IRedirectDTO>) {
    return (
      await (
        await this.ogmService.Redirect
      ).create({
        input: redirects.map(
          ({ authGuard, id, source, targetType, targetPage, targetUrl }) => ({
            id,
            targetType,
            authGuard: connectNodeId(authGuard.id),
            source: connectNodeId(source.id),
            targetPage:
              targetType === IRedirectTargetType.Page
                ? reconnectNodeId(targetPage?.id)
                : undefined,
            targetUrl:
              targetType === IRedirectTargetType.Url ? targetUrl : undefined,
          }),
        ),
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
