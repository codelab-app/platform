import type { IFieldDto, IMapper } from '@codelab/shared/abstract/core'
import type {
  FieldCreateInput,
  FieldDeleteInput,
  FieldUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/orm'
import { isValidJson } from '@codelab/shared/utils'

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
      defaultValues: isValidJson(defaultValues)
        ? defaultValues
        : JSON.stringify(defaultValues),
      description,
      fieldType: connectNodeId(fieldType.id),
      id,
      key,
      name,
      validationRules: isValidJson(validationRules)
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
      defaultValues: isValidJson(defaultValues)
        ? defaultValues
        : JSON.stringify(defaultValues),
      description,
      // fieldType: reconnectNodeId(fieldType.id),
      key,
      name,
      validationRules: isValidJson(validationRules)
        ? validationRules
        : JSON.stringify(validationRules),
    }
  },
}
