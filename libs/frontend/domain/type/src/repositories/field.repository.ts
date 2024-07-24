import type {
  IFieldModel,
  IFieldRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  FieldOptions,
  FieldUniqueWhere,
  FieldWhere,
} from '@codelab/frontend/infra/gql'
import { fieldApi } from './field.api'

export const fieldRepository: IFieldRepository = {
  add: async (field: IFieldModel) => {
    const {
      createFields: {
        fields: [fieldFragment],
      },
    } = await fieldApi.CreateFields({
      input: field.toCreateInput(),
    })

    return fieldFragment
  },

  delete: async (fields: Array<IFieldModel>) => {
    const {
      deleteFields: { nodesDeleted },
    } = await fieldApi.DeleteFields({
      where: {
        id_IN: fields.map((field) => field.id),
      },
    })

    return nodesDeleted
  },

  find: async (where?: FieldWhere, options?: FieldOptions) => {
    return await fieldApi.GetFields({ options, where })
  },

  findOne: async (where: FieldUniqueWhere) => {
    return (await fieldRepository.find(where)).items[0]
  },

  update: async (field: IFieldModel) => {
    const {
      updateFields: {
        fields: [fieldFragment],
      },
    } = await fieldApi.UpdateFields({
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
    } = await fieldApi.UpdateFields({
      update: field.toUpdateNodesInput(),
      where: { id: field.id },
    })

    return fields[0]!
  },
}
