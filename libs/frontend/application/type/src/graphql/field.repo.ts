import type { IFieldRepository } from '@codelab/frontend/abstract/application'
import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type {
  FieldOptions,
  FieldUniqueWhere,
  FieldWhere,
} from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { fieldApi } from './field.api'

@model('@codelab/FieldRepository')
export class FieldRepository extends Model({}) implements IFieldRepository {
  @modelFlow
  add = _async(function* (this: FieldRepository, field: IFieldModel) {
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
  delete = _async(function* (
    this: FieldRepository,
    fields: Array<IFieldModel>,
  ) {
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

  @modelFlow
  find = _async(function* (
    this: FieldRepository,
    where?: FieldWhere,
    options?: FieldOptions,
  ) {
    return yield* _await(fieldApi.GetFields({ options, where }))
  })

  @modelFlow
  findOne = _async(function* (this: FieldRepository, where: FieldUniqueWhere) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  update = _async(function* (this: FieldRepository, field: IFieldModel) {
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
  updateNodes = _async(function* (this: FieldRepository, field: IFieldModel) {
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
}
