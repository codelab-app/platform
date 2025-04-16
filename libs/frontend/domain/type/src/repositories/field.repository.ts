import type {
  IFieldModel,
  IFieldRepository,
} from '@codelab/frontend-abstract-domain'
import type { IFieldDto, IRef } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type { FieldOptions, FieldWhere } from '@codelab/shared-infra-gqlgen'

import {
  fieldMapper,
  fieldServerActions,
} from '@codelab/shared-domain-module-field'
import { Validator } from '@codelab/shared-infra-typebox'

const { CreateFields, DeleteFields, GetFields, UpdateFields } =
  fieldServerActions

export const fieldRepository: IFieldRepository = {
  add: async (field: IFieldDto, next?: NextFetchOptions) => {
    const {
      createFields: {
        fields: [fieldFragment],
      },
    } = await CreateFields(
      {
        input: fieldMapper.toCreateInput(field),
      },
      next,
    )

    Validator.assertsDefined(fieldFragment)

    return fieldFragment
  },

  delete: async (fields: Array<IFieldModel>, next?: NextFetchOptions) => {
    const {
      deleteFields: { nodesDeleted },
    } = await DeleteFields(
      {
        where: {
          id_IN: fields.map((field) => field.id),
        },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: FieldWhere,
    options?: FieldOptions,
    next?: NextFetchOptions,
  ) => {
    return await GetFields({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: FieldWhere, next?: NextFetchOptions) => {
    return (await fieldRepository.find(where, {}, next)).items[0]
  },

  update: async ({ id }: IRef, field: IFieldDto, next?: NextFetchOptions) => {
    const {
      updateFields: {
        fields: [fieldFragment],
      },
    } = await UpdateFields(
      {
        update: fieldMapper.toUpdateInput(field),
        where: {
          id,
        },
      },
      next,
    )

    Validator.assertsDefined(fieldFragment)

    return fieldFragment
  },

  updateNodes: async (field: IFieldModel, next?: NextFetchOptions) => {
    const {
      updateFields: { fields },
    } = await UpdateFields(
      {
        update: field.toUpdateNodesInput(),
        where: { id: field.id },
      },
      next,
    )

    return fields[0]!
  },
}
