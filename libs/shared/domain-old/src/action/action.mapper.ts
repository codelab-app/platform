import type {
  IActionDto,
  IActionType,
  ICreateActionData,
  IMapper,
} from '@codelab/shared/abstract/core'

import { IActionKind } from '@codelab/shared/abstract/core'

import type {
  IActionCreateInput,
  IActionDeleteInput,
  IActionUpdateInput,
} from './action.input.interface'

import { connectNodeId, disconnectAll } from '../orm'
import { propMapper } from '../prop'

export const actionMapper: IMapper<
  IActionDto,
  IActionCreateInput,
  IActionUpdateInput,
  IActionDeleteInput
> = {
  toCreateInput: (dto: IActionDto): IActionCreateInput => {
    switch (dto.__typename) {
      case IActionKind.ApiAction:
        return {
          config: {
            create: {
              node: propMapper.toCreateInput(dto.config),
            },
          },
          // empty object errorAction: {} causes validation error
          errorAction: dto.errorAction?.id
            ? {
                ApiAction: connectNodeId(dto.errorAction.id),
                CodeAction: connectNodeId(dto.errorAction.id),
              }
            : undefined,
          id: dto.id,
          name: dto.name,
          resource: connectNodeId(dto.resource.id),
          store: connectNodeId(dto.store.id),
          // empty object successAction: {} causes validation error
          successAction: dto.successAction?.id
            ? {
                ApiAction: connectNodeId(dto.successAction.id),
                CodeAction: connectNodeId(dto.successAction.id),
              }
            : undefined,
        }

      case IActionKind.CodeAction:
        return {
          code: dto.code,
          id: dto.id,
          name: dto.name,
          store: connectNodeId(dto.store.id),
          type: IActionKind.CodeAction,
        }

      default:
        throw new Error('Action type not supported')
    }
  },

  toDeleteInput: (type: IActionKind): IActionDeleteInput => {
    switch (type) {
      case IActionKind.ApiAction:
        return {
          config: { where: {} },
        }
      case IActionKind.CodeAction:
        return {}
      default:
        throw new Error('Action type not supported')
    }
  },

  toUpdateInput: (dto: IActionDto): IActionUpdateInput => {
    switch (dto.__typename) {
      case IActionKind.ApiAction:
        return {
          config: {
            update: {
              node: propMapper.toUpdateInput(dto.config),
            },
          },
          // empty object errorAction: {} causes validation error
          errorAction: dto.errorAction?.id
            ? {
                ApiAction: connectNodeId(dto.errorAction.id),
                CodeAction: connectNodeId(dto.errorAction.id),
              }
            : undefined,
          name: dto.name,
          resource: {
            ...connectNodeId(dto.resource.id),
            ...disconnectAll({
              omitId: dto.resource.id,
            }),
          },
          // empty object successAction: {} causes validation error
          successAction: dto.successAction?.id
            ? {
                ApiAction: connectNodeId(dto.successAction.id),
                CodeAction: connectNodeId(dto.successAction.id),
              }
            : undefined,
        }

      case IActionKind.CodeAction:
        return {
          code: dto.code,
          name: dto.name,
        }

      default:
        throw new Error('Action type not supported')
    }
  },
}
