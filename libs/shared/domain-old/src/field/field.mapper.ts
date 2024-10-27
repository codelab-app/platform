import type { IFieldDto, IMapper } from '@codelab/shared/abstract/core'
import type {
  FieldCreateInput,
  FieldDeleteInput,
  FieldUpdateInput,
} from '@codelab/shared/infra/gql'

import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
  reconnectNodeId,
  reconnectNodeIds,
} from '../orm'

export const fieldMapper: IMapper<
  IFieldDto,
  FieldCreateInput,
  FieldUpdateInput,
  FieldDeleteInput
> = {
  toCreateInput: ({
    api,
    defaultValues,
    description,
    fieldType,
    id,
    key,
    name,
    validationRules,
  }: IFieldDto): FieldCreateInput => {
    return {
      api: connectNodeId(api.id),
      defaultValues: JSON.stringify(defaultValues),
      description,
      fieldType: connectNodeId(fieldType.id),
      id,
      key,
      name,
      validationRules: JSON.stringify(validationRules),
    }
  },

  toDeleteInput: () => {
    return {}
  },

  toUpdateInput: ({
    defaultValues,
    description,
    fieldType,
    id,
    key,
    name,
    validationRules,
  }: IFieldDto): FieldUpdateInput => {
    return {
      defaultValues: JSON.stringify(defaultValues),
      description,
      fieldType: reconnectNodeId(fieldType.id),
      key,
      name,
      validationRules: JSON.stringify(validationRules),
    }
  },
}
