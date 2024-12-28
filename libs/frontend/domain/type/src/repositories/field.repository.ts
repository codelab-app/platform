import type {
  IFieldModel,
  IFieldRepository,
} from '@codelab/frontend/abstract/domain'
import type { IFieldDto, IRef } from '@codelab/shared/abstract/core'
import type {
  FieldOptions,
  FieldUniqueWhere,
  FieldWhere,
} from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/validation'
import {
  fieldMapper,
  fieldServerActions,
} from '@codelab/shared-domain-module/field'

const { CreateFields, DeleteFields, GetFields, UpdateFields } =
  fieldServerActions

export const fieldRepository: IFieldRepository = {
  add: async (field: IFieldDto) => {
    const {
      createFields: {
        fields: [fieldFragment],
      },
    } = await CreateFields({
      input: fieldMapper.toCreateInput(field),
    })

    Validator.assertsDefined(fieldFragment)

    return fieldFragment
  },

  delete: async (fields: Array<IFieldModel>) => {
    const {
      deleteFields: { nodesDeleted },
    } = await DeleteFields({
      where: {
        id_IN: fields.map((field) => field.id),
      },
    })

    return nodesDeleted
  },

  find: async (where?: FieldWhere, options?: FieldOptions) => {
    return await GetFields({ options, where })
  },

  findOne: async (where: FieldUniqueWhere) => {
    return (await fieldRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, field: IFieldDto) => {
    const {
      updateFields: {
        fields: [fieldFragment],
      },
    } = await UpdateFields({
      update: fieldMapper.toUpdateInput(field),
      where: {
        id,
      },
    })

    Validator.assertsDefined(fieldFragment)

    return fieldFragment
  },

  updateNodes: async (field: IFieldModel) => {
    const {
      updateFields: { fields },
    } = await UpdateFields({
      update: field.toUpdateNodesInput(),
      where: { id: field.id },
    })

    return fields[0]!
  },
}
