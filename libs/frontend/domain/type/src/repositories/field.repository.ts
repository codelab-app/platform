import type {
  IFieldModel,
  IFieldRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  FieldOptions,
  FieldUniqueWhere,
  FieldWhere,
} from '@codelab/shared/infra/gql'
import {
  CreateFields,
  DeleteFields,
  GetFields,
  UpdateFields,
} from './field.api.graphql.gen'

export const fieldRepository: IFieldRepository = {
  add: async (field: IFieldModel) => {
    const {
      createFields: {
        fields: [fieldFragment],
      },
    } = await CreateFields({
      input: field.toCreateInput(),
    })

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

  update: async (field: IFieldModel) => {
    const {
      updateFields: {
        fields: [fieldFragment],
      },
    } = await UpdateFields({
      update: field.toUpdateInput(),
      where: {
        id: field.id,
      },
    })

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
