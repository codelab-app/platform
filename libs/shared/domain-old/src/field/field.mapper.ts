import type { IFieldDto, IMapper } from '@codelab/shared/abstract/core'
import type {
  FieldCreateInput,
  FieldDeleteInput,
  FieldUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId, reconnectNodeId } from '../orm'

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
      defaultValues:
        typeof defaultValues === 'string'
          ? defaultValues
          : JSON.stringify(defaultValues),
      description,
      fieldType: connectNodeId(fieldType.id),
      id,
      key,
      name,
      validationRules:
        typeof validationRules === 'string'
          ? validationRules
          : JSON.stringify(validationRules),
    }
  },

  toDeleteInput: () => {
    return {}
  },

  toUpdateInput: ({
    api,
    defaultValues,
    description,
    fieldType,
    key,
    name,
    nextSibling,
    prevSibling,
    validationRules,
  }: IFieldDto): FieldUpdateInput => {
    return {
      defaultValues:
        typeof defaultValues === 'string'
          ? defaultValues
          : JSON.stringify(defaultValues),
      description,
      // fieldType: reconnectNodeId(fieldType.id),
      key,
      name,
      validationRules:
        typeof validationRules === 'string'
          ? validationRules
          : JSON.stringify(validationRules),
    }
  },
}
