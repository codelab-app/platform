import type {
  IActionModel,
  IActionOptions,
  IActionRepository,
  IActionWhere,
} from '@codelab/frontend/abstract/domain'
import { ApiAction, CodeAction } from '@codelab/frontend-domain-action/store'
import { IActionKind } from '@codelab/shared/abstract/core'
import {
  CreateApiActions,
  CreateCodeActions,
} from './create-action.api.graphql.gen'
import {
  DeleteApiActions,
  DeleteCodeActions,
} from './delete-action.api.graphql.gen'
import { GetActions } from './get-action.api.graphql.gen'
import {
  UpdateApiActions,
  UpdateCodeActions,
} from './update-action.api.graphql.gen'

export const actionRepository: IActionRepository = {
  add: async (action: IActionModel) => {
    switch (action.type) {
      case IActionKind.CodeAction: {
        const {
          createCodeActions: { codeActions },
        } = await CreateCodeActions({
          input: action.toCreateInput(),
        })

        return codeActions[0]
      }

      case IActionKind.ApiAction: {
        const {
          createApiActions: { apiActions },
        } = await CreateApiActions({
          input: action.toCreateInput(),
        })

        return apiActions[0]
      }
    }
  },

  delete: async (actions: Array<IActionModel>) => {
    let nodesDeleted = 0

    for (const action of actions) {
      switch (action.type) {
        case IActionKind.CodeAction: {
          const {
            deleteCodeActions: { nodesDeleted: deleted },
          } = await DeleteCodeActions({
            delete: CodeAction.toDeleteInput(),
            where: { id: action.id },
          })

          nodesDeleted += deleted
          break
        }

        case IActionKind.ApiAction: {
          const {
            deleteApiActions: { nodesDeleted: deleted },
          } = await DeleteApiActions({
            delete: ApiAction.toDeleteInput(),
            where: { id: action.id },
          })

          nodesDeleted += deleted
          break
        }
      }
    }

    return nodesDeleted
  },

  find: async (where: IActionWhere = {}, options?: IActionOptions) => {
    const { apiActions, codeActions } = await GetActions({
      apiActionWhere: where,
      codeActionWhere: where,
    })

    const items = [...apiActions, ...codeActions]

    return {
      aggregate: {
        count: items.length,
      },
      items,
    }
  },

  findOne: async (where: IActionWhere) => {
    const result = await actionRepository.find(where)

    return result.items[0]
  },

  update: async (action: IActionModel) => {
    switch (action.type) {
      case IActionKind.CodeAction: {
        const {
          updateCodeActions: { codeActions },
        } = await UpdateCodeActions({
          update: action.toUpdateInput(),
          where: { id: action.id },
        })

        return codeActions[0]
      }

      case IActionKind.ApiAction: {
        const {
          updateApiActions: { apiActions },
        } = await UpdateApiActions({
          update: action.toUpdateInput(),
          where: { id: action.id },
        })

        return apiActions[0]
      }
    }
  },
}
