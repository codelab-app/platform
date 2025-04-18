import type { IApiActionDto, IMapper } from '@codelab/shared-abstract-core'
import type {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import { connectNodeId, disconnectAll } from '@codelab/shared-domain-orm'
import { propMapper } from '@codelab/shared-domain-module-prop'

export const apiActionMapper: IMapper<
  IApiActionDto,
  ApiActionCreateInput,
  ApiActionUpdateInput,
  ApiActionDeleteInput
> = {
  toCreateInput: (dto: IApiActionDto) => {
    const { id, name, store } = dto

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
      id,
      name,
      resource: connectNodeId(dto.resource.id),
      store: connectNodeId(store.id),
      // empty object successAction: {} causes validation error
      successAction: dto.successAction?.id
        ? {
            ApiAction: connectNodeId(dto.successAction.id),
            CodeAction: connectNodeId(dto.successAction.id),
          }
        : undefined,
    }
  },
  toDeleteInput: (): ApiActionDeleteInput => ({
    config: { where: {} },
  }),
  toUpdateInput: (dto: IApiActionDto): ApiActionUpdateInput => ({
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
  }),
}
