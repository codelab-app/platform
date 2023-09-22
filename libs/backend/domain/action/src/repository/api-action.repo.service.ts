import type {
  ApiAction,
  ApiActionOptions,
  ApiActionWhere,
} from '@codelab/backend/abstract/codegen'
import {
  actionSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type {
  IActionEntity,
  IApiActionDTO,
} from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiActionRepository extends AbstractRepository<
  IApiActionDTO,
  ApiAction,
  ApiActionWhere,
  ApiActionOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _add(actions: Array<IApiActionDTO>) {
    return (
      await (
        await this.ogmService.ApiAction
      ).create({
        input: actions.map(
          ({
            config,
            errorAction,
            resource,
            store,
            successAction,
            ...action
          }) => ({
            ...action,
            config: connectNodeId(config.id),
            errorAction: {
              ApiAction: connectNodeId(
                this.filterBy(errorAction, IActionKind.ApiAction),
              ),
              CodeAction: connectNodeId(
                this.filterBy(errorAction, IActionKind.CodeAction),
              ),
            },
            resource: connectNodeId(resource.id),
            store: connectNodeId(store.id),
            successAction: {
              ApiAction: connectNodeId(
                this.filterBy(successAction, IActionKind.ApiAction),
              ),
              CodeAction: connectNodeId(
                this.filterBy(successAction, IActionKind.CodeAction),
              ),
            },
          }),
        ),
      })
    ).apiActions
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ApiActionWhere
    options?: ApiActionOptions
  }) {
    return await (
      await this.ogmService.ApiAction
    ).find({
      options,
      selectionSet: actionSelectionSet,
      where,
    })
  }

  protected async _update(
    {
      config,
      errorAction,
      id,
      resource,
      store,
      successAction,
      ...action
    }: IApiActionDTO,
    where: ApiActionWhere,
  ) {
    return (
      await (
        await this.ogmService.ApiAction
      ).update({
        update: {
          ...action,
          config: reconnectNodeId(config.id),
          errorAction: {
            ApiAction: reconnectNodeId(
              this.filterBy(errorAction, IActionKind.ApiAction),
            ),
            CodeAction: reconnectNodeId(
              this.filterBy(errorAction, IActionKind.CodeAction),
            ),
          },
          resource: reconnectNodeId(resource.id),
          store: reconnectNodeId(store.id),
          successAction: {
            ApiAction: reconnectNodeId(
              this.filterBy(successAction, IActionKind.ApiAction),
            ),
            CodeAction: reconnectNodeId(
              this.filterBy(successAction, IActionKind.CodeAction),
            ),
          },
        },
        where,
      })
    ).apiActions[0]
  }

  /**
   * Filters the entity by their appropriate types
   */
  private filterBy(
    action: IActionEntity | null | undefined,
    discriminate: IActionKind,
  ) {
    if (action?.__typename === `${discriminate}`) {
      return action.id
    }

    return null
  }
}
