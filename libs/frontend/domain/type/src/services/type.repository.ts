import type {
  IAnyType,
  ITypeDTO,
  ITypeRepository,
} from '@codelab/frontend/abstract/core'
import type { BaseTypeWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  updateTypeApi,
} from '../store'

@model('@codelab/TypeRepository')
export class TypeRepository extends Model({}) implements ITypeRepository {
  @modelFlow
  add = _async(function* (this: TypeRepository, type: IAnyType) {
    const createdType: Array<ITypeDTO> = yield* _await(
      createTypeApi[type.kind]([type.toCreateInput()]),
    )

    return createdType[0]
  })

  @modelFlow
  update = _async(function* (this: TypeRepository, type: IAnyType) {
    const updatedType = (yield* _await(
      updateTypeApi[type.kind](type.toUpdateInput()),
    ))[0]

    return updatedType!
  })

  @modelFlow
  find = _async(function* (this: TypeRepository, where: BaseTypeWhere) {
    const ids = where.id_IN ?? undefined
    const types = yield* _await(getAllTypes(ids))

    return types
  })

  @modelFlow
  delete = _async(function* (this: TypeRepository, types: Array<IAnyType>) {
    const results = yield* _await(
      Promise.all(
        types.map((type) =>
          deleteTypeApi[type.kind]({ where: { id: type.id } }),
        ),
      ),
    )

    const nodesDeleted = results.reduce(
      (acc, result) => acc + result.nodesDeleted,
      0,
    )

    return nodesDeleted
  })
}
