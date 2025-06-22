import type {
  IActionRef,
  IApiActionDto,
  INodeType,
} from '@codelab/shared-abstract-core'
import type {
  ApiActionOptions,
  ApiActionWhere,
} from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import { IActionKind } from '@codelab/shared-abstract-core'
import { ApiActionFragment } from '@codelab/shared-infra-gqlgen'
import { apiActionMapper } from '@codelab/shared-domain-module-action'
import {
  actionCreateApi,
  actionFindApi,
  actionUpdateApi,
} from '@codelab/shared-domain-module-store'
import { Injectable } from '@nestjs/common'

const { CreateApiActions } = actionCreateApi()
const { UpdateApiActions } = actionUpdateApi()
// TODO: Split by type
const { GetActions } = actionFindApi()

@Injectable()
export class ApiActionRepository extends AbstractRepository<
  INodeType.ApiAction,
  IApiActionDto,
  ApiActionFragment,
  ApiActionWhere,
  ApiActionOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(actions: Array<IApiActionDto>) {
    const {
      createApiActions: { apiActions },
    } = await CreateApiActions({
      input: actions.map((action) => apiActionMapper.toCreateInput(action)),
    })

    return apiActions
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ApiActionWhere
    options?: ApiActionOptions
  }) {
    const { apiActions } = await GetActions({ apiActionWhere: where })

    return apiActions
  }

  protected async _update(dto: IApiActionDto, where: ApiActionWhere) {
    const {
      updateApiActions: { apiActions },
    } = await UpdateApiActions({
      update: apiActionMapper.toUpdateInput(dto),
      where,
    })

    return apiActions[0]
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
