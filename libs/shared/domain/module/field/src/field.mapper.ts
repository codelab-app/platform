import type { IFieldDto, IMapper } from '@codelab/shared-abstract-core'
import type {
  FieldCreateInput,
  FieldDeleteInput,
  FieldUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import { connectNodeId, reconnectNodeId } from '@codelab/shared-domain-orm'
import { encodeJson } from '@codelab/shared-utils'

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
    prevSibling,
    validationRules,
  }: IFieldDto): FieldCreateInput => {
    return {
      api: connectNodeId(api.id),
      defaultValues: encodeJson(defaultValues),
      description,
      fieldType: connectNodeId(fieldType.id),
      id,
      key,
      name,
      prevSibling: prevSibling?.id ? connectNodeId(prevSibling.id) : undefined,
      validationRules: encodeJson(validationRules),
    }
  },

  toDeleteInput: () => {
    return {}
  },

  toUpdateInput: ({
    defaultValues,
    description,
    key,
    name,
    nextSibling,
    prevSibling,
    validationRules,
  }: IFieldDto): FieldUpdateInput => {
    return {
      defaultValues: encodeJson(defaultValues),
      description,
      // fieldType: reconnectNodeId(fieldType.id),
      key,
      name,
      nextSibling: nextSibling?.id
        ? reconnectNodeId(nextSibling.id)
        : undefined,
      prevSibling: prevSibling?.id
        ? reconnectNodeId(prevSibling.id)
        : undefined,
      validationRules: encodeJson(validationRules),
    }
  },
}
