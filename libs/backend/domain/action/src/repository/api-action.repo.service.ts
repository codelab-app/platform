import type {
  ApiAction,
  ApiActionOptions,
  ApiActionWhere,
} from '@codelab/backend/abstract/codegen'
import type { IActionRef, IApiActionDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  apiActionSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiActionRepository extends AbstractRepository<
  IApiActionDto,
  ApiAction,
  ApiActionWhere,
  ApiActionOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(actions: Array<IApiActionDto>) {
    // this.nestjsLogger.log(actions, `much wow`)

    return (
      await (
        await this.ogmService.ApiAction
      ).create({
        input: actions.map(
          ({
            __typename,
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
              ApiAction: connectNodeId(errorAction?.id),
              CodeAction: connectNodeId(errorAction?.id),
            },
            resource: connectNodeId(resource.id),
            store: connectNodeId(store.id),
            successAction: {
              ApiAction: connectNodeId(successAction?.id),
              CodeAction: connectNodeId(successAction?.id),
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
      selectionSet: `{ ${apiActionSelectionSet} }`,
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
    }: IApiActionDto,
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
    action: IActionRef | null | undefined,
    discriminate: IActionKind,
  ) {
    if (action?.__typename === discriminate) {
      return action.id
    }

    return null
  }
}
