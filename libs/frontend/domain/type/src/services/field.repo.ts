import type { IField, IFieldRepository } from '@codelab/frontend/abstract/core'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { fieldApi } from '../store'

@model('@codelab/FieldRepository')
export class FieldRepository extends Model({}) implements IFieldRepository {
  @modelFlow
  add = _async(function* (this: FieldRepository, field: IField) {
    const {
      createFields: {
        fields: [fieldFragment],
      },
    } = yield* _await(
      fieldApi.CreateFields({
        input: field.toCreateInput(),
      }),
    )

    return fieldFragment
  })

  @modelFlow
  update = _async(function* (this: FieldRepository, field: IField) {
    const {
      updateFields: {
        fields: [fieldFragment],
      },
    } = yield* _await(
      fieldApi.UpdateFields({
        update: field.toUpdateInput(),
        where: {
          id: field.id,
        },
      }),
    )

    return fieldFragment
  })

  @modelFlow
  updateNodes = _async(function* (this: FieldRepository, field: IField) {
    const {
      updateFields: { fields },
    } = yield* _await(
      fieldApi.UpdateFields({
        update: field.toUpdateNodesInput(),
        where: { id: field.id },
      }),
    )

    return fields[0]
  })

  @modelFlow
  delete = _async(function* (this: FieldRepository, fields: Array<IField>) {
    const {
      deleteFields: { nodesDeleted },
    } = yield* _await(
      fieldApi.DeleteFields({
        where: {
          id_IN: fields.map((field) => field.id),
        },
      }),
    )

    return nodesDeleted
  })
}
