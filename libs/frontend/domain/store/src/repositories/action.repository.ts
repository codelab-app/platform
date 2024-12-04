import type {
  IActionModel,
  IActionOptions,
  IActionRepository,
  IActionWhere,
} from '@codelab/frontend/abstract/domain'
import type { IActionDto, IRef } from '@codelab/shared/abstract/core'
import type { CodeActionCreateInput } from '@codelab/shared/infra/gql'

import { IActionKind } from '@codelab/shared/abstract/core'
import { actionMapper } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'

import {
  CreateApiActions,
  CreateCodeActions,
} from './create-action.api.graphql.web.gen'
import {
  DeleteApiActions,
  DeleteCodeActions,
} from './delete-action.api.graphql.web.gen'
import { GetActions } from './get-action.api.graphql.web.gen'
import {
  UpdateApiActions,
  UpdateCodeActions,
} from './update-action.api.graphql.web.gen'

export const actionRepository: IActionRepository = {
  add: async (action: IActionDto) => {
    switch (action.__typename) {
      case IActionKind.ApiAction: {
        const {
          createApiActions: { apiActions },
        } = await CreateApiActions({
          input: actionMapper.toCreateInput(action),
        })

        Validator.assertsDefined(apiActions[0])

        return apiActions[0]
      }

      case IActionKind.CodeAction: {
        const input = actionMapper.toCreateInput(
          action,
        ) as CodeActionCreateInput

        const {
          createCodeActions: { codeActions },
        } = await CreateCodeActions({
          input,
        })

        Validator.assertsDefined(codeActions[0])

        return codeActions[0]
      }

      default:
        throw new Error(`Unknown action type: ${action.__typename}`)
    }
  },

  delete: async (actions: Array<IActionModel>) => {
    let nodesDeleted = 0

    for (const action of actions) {
      switch (action.type) {
        case IActionKind.ApiAction: {
          const {
            deleteApiActions: { nodesDeleted: deleted },
          } = await DeleteApiActions({
            delete: actionMapper.toDeleteInput(action.type),
            where: { id: action.id },
          })

          nodesDeleted += deleted
          break
        }

        case IActionKind.CodeAction: {
          const {
            deleteCodeActions: { nodesDeleted: deleted },
          } = await DeleteCodeActions({
            delete: actionMapper.toDeleteInput(action.type),
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

  update: async ({ id }: IRef, dto: IActionDto) => {
    switch (dto.__typename) {
      case IActionKind.ApiAction: {
        const {
          updateApiActions: { apiActions },
        } = await UpdateApiActions({
          update: actionMapper.toUpdateInput(dto),
          where: { id },
        })

        Validator.assertsDefined(apiActions[0])

        return apiActions[0]
      }

      case IActionKind.CodeAction: {
        const {
          updateCodeActions: { codeActions },
        } = await UpdateCodeActions({
          update: actionMapper.toUpdateInput(dto),
          where: { id },
        })

        Validator.assertsDefined(codeActions[0])

        return codeActions[0]
      }

      default:
        throw new Error('Unknown action type: ' + dto.__typename)
    }
  },
}
