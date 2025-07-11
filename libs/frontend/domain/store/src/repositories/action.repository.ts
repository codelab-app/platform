import type {
  IActionOptions,
  IActionRepository,
  IActionWhere,
} from '@codelab/frontend-abstract-domain'
import type {
  IActionDto,
  IActionRef,
  IRef,
} from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'

import { IActionKind } from '@codelab/shared-abstract-core'
import {
  apiActionMapper,
  codeActionMapper,
} from '@codelab/shared-domain-module-action'
import {
  actionCreateServerActions,
  actionDeleteServerActions,
  actionGetServerActions,
  actionUpdateServerActions,
} from '@codelab/shared-domain-module-store'
import { Validator } from '@codelab/shared-infra-typebox'

const { CreateApiActions, CreateCodeActions } = actionCreateServerActions
const { UpdateApiActions, UpdateCodeActions } = actionUpdateServerActions
const { DeleteApiActions, DeleteCodeActions } = actionDeleteServerActions
const { GetActions } = actionGetServerActions

/**
 * We can't use type api record approach since we need nested created for here, we need switch case to map the data
 */
export const actionRepository: IActionRepository = {
  add: async (action: IActionDto, next?: NextFetchOptions) => {
    switch (action.__typename) {
      case IActionKind.ApiAction: {
        const {
          createApiActions: { apiActions },
        } = await CreateApiActions(
          {
            input: apiActionMapper.toCreateInput(action),
          },
          next,
        )

        Validator.assertsDefined(apiActions[0])

        return apiActions[0]
      }

      case IActionKind.CodeAction: {
        const {
          createCodeActions: { codeActions },
        } = await CreateCodeActions(
          {
            input: codeActionMapper.toCreateInput(action),
          },
          next,
        )

        Validator.assertsDefined(codeActions[0])

        return codeActions[0]
      }

      default:
        throw new Error(`Unknown action type: ${action.__typename}`)
    }
  },

  delete: async (actions: Array<IActionRef>, next?: NextFetchOptions) => {
    let nodesDeleted = 0

    for (const action of actions) {
      switch (action.__typename) {
        case IActionKind.ApiAction: {
          const {
            deleteApiActions: { nodesDeleted: deleted },
          } = await DeleteApiActions(
            {
              delete: apiActionMapper.toDeleteInput(action.__typename),
              where: { id: action.id },
            },
            next,
          )

          nodesDeleted += deleted
          break
        }

        case IActionKind.CodeAction: {
          const {
            deleteCodeActions: { nodesDeleted: deleted },
          } = await DeleteCodeActions(
            {
              delete: codeActionMapper.toDeleteInput(action.__typename),
              where: { id: action.id },
            },
            next,
          )

          nodesDeleted += deleted
          break
        }
      }
    }

    return nodesDeleted
  },

  find: async (
    where: IActionWhere = {},
    options?: IActionOptions,
    next?: NextFetchOptions,
  ) => {
    const { apiActions, codeActions } = await GetActions(
      {
        apiActionOptions: options,
        apiActionWhere: where,
        codeActionOptions: options,
        codeActionWhere: where,
      },
      next,
    )

    const items = [...apiActions, ...codeActions]

    return {
      aggregate: {
        count: items.length,
      },
      items,
    }
  },

  findOne: async (where: IActionWhere, next?: NextFetchOptions) => {
    const result = await actionRepository.find(where, undefined, next)

    return result.items[0]
  },

  update: async ({ id }: IRef, dto: IActionDto, next?: NextFetchOptions) => {
    switch (dto.__typename) {
      case IActionKind.ApiAction: {
        const {
          updateApiActions: { apiActions },
        } = await UpdateApiActions(
          {
            update: apiActionMapper.toUpdateInput(dto),
            where: { id },
          },
          next,
        )

        Validator.assertsDefined(apiActions[0])

        return apiActions[0]
      }

      case IActionKind.CodeAction: {
        const {
          updateCodeActions: { codeActions },
        } = await UpdateCodeActions(
          {
            update: codeActionMapper.toUpdateInput(dto),
            where: { id },
          },
          next,
        )

        Validator.assertsDefined(codeActions[0])

        return codeActions[0]
      }

      default:
        throw new Error('Unknown action type: ' + dto.__typename)
    }
  },
}
