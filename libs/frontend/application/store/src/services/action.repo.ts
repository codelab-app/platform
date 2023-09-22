import type { IActionRepository } from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IActionOptions,
  IActionWhere,
} from '@codelab/frontend/abstract/domain'
import { ApiAction, CodeAction } from '@codelab/frontend/domain/store'
import { IActionKind } from '@codelab/shared/abstract/core'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import {
  ApiAction,
  CodeAction,
  createActionApi,
  deleteActionApi,
  getActionApi,
  updateActionApi,
} from '../store'

@model('@codelab/ActionRepository')
export class ActionRepository extends Model({}) implements IActionRepository {
  @modelFlow
  add = _async(function* (this: ActionRepository, action: IActionModel) {
    switch (action.type) {
      case IActionKind.CodeAction: {
        const {
          createCodeActions: { codeActions },
        } = yield* _await(
          createActionApi.CreateCodeActions({
            input: action.toCreateInput(),
          }),
        )

        return codeActions[0]
      }

      case IActionKind.ApiAction: {
        const {
          createApiActions: { apiActions },
        } = yield* _await(
          createActionApi.CreateApiActions({
            input: action.toCreateInput(),
          }),
        )

        return apiActions[0]
      }
    }
  })

  @modelFlow
  delete = _async(function* (
    this: ActionRepository,
    actions: Array<IActionModel>,
  ) {
    for (const action of actions) {
      switch (action.type) {
        case IActionKind.CodeAction: {
          const {
            deleteCodeActions: { nodesDeleted },
          } = yield* _await(
            deleteActionApi.DeleteCodeActions({
              delete: CodeAction.toDeleteInput(),
              where: { id: action.id },
            }),
          )

          return nodesDeleted
        }

        case IActionKind.ApiAction: {
          const {
            deleteApiActions: { nodesDeleted },
          } = yield* _await(
            deleteActionApi.DeleteApiActions({
              delete: ApiAction.toDeleteInput(),
              where: { id: action.id },
            }),
          )

          return nodesDeleted
        }
      }
    }

    return actions.length
  })

  @modelFlow
  find = _async(function* (
    this: ActionRepository,
    where: IActionWhere = {},
    options?: IActionOptions,
  ) {
    const { apiActions, codeActions } = yield* _await(
      getActionApi.GetActions({
        apiActionWhere: where,
        codeActionWhere: where,
      }),
    )

    const items = [...apiActions, ...codeActions]

    return {
      aggregate: {
        count: items.length,
      },
      items,
    }
  })

  @modelFlow
  findOne = _async(function* (this: ActionRepository, where: IActionWhere) {
    const result = yield* _await(this.find(where))

    return result.items[0]
  })

  @modelFlow
  update = _async(function* (this: ActionRepository, action: IActionModel) {
    switch (action.type) {
      case IActionKind.CodeAction: {
        const {
          updateCodeActions: { codeActions },
        } = yield* _await(
          updateActionApi.UpdateCodeActions({
            update: action.toUpdateInput(),
            where: { id: action.id },
          }),
        )

        return codeActions[0]
      }

      case IActionKind.ApiAction: {
        const {
          updateApiActions: { apiActions },
        } = yield* _await(
          updateActionApi.UpdateApiActions({
            update: action.toUpdateInput(),
            where: { id: action.id },
          }),
        )

        return apiActions[0]
      }
    }
  })
}
