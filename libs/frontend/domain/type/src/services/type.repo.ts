import type {
  BaseTypesOptions,
  IType,
  ITypeDTO,
  ITypeRepository,
} from '@codelab/frontend/abstract/core'
import type { BaseTypeWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  getTypeApi,
  updateTypeApi,
} from '../store'

@model('@codelab/TypeRepository')
export class TypeRepository extends Model({}) implements ITypeRepository {
  @modelFlow
  add = _async(function* (this: TypeRepository, type: IType) {
    const createdTypes = yield* _await(
      createTypeApi[type.kind]([type.toCreateInput()]),
    )

    return createdTypes[0]
  })

  @modelFlow
  update = _async(function* (this: TypeRepository, type: IType) {
    const updatedType = (yield* _await(
      updateTypeApi[type.kind]({
        update: type.toUpdateInput(),
        where: {
          id: type.id,
        },
      }),
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
  findDescendants = _async(function* (
    this: TypeRepository,
    parentIds: Array<string>,
  ) {
    const { arrayTypes, interfaceTypes, unionTypes } = yield* _await(
      getTypeApi.GetDescendants({ ids: parentIds }),
    )

    const allDescendantIdsWithoutParents = [
      ...arrayTypes,
      ...unionTypes,
      ...interfaceTypes,
    ]
      .reduce<Array<string>>(
        (descendantIds, { descendantTypesIds }) => [
          ...descendantIds,
          ...descendantTypesIds.flat(),
        ],
        [],
      )
      .filter((id) => !parentIds.includes(id))

    return yield* _await(getAllTypes(allDescendantIdsWithoutParents))
  })

  @modelFlow
  findBaseTypes = _async(function* (
    this: TypeRepository,
    { limit, offset, where }: BaseTypesOptions,
  ) {
    const {
      baseTypes: { items, totalCount },
    } = yield* _await(
      getTypeApi.GetBaseTypes({
        options: {
          limit,
          offset,
          where,
        },
      }),
    )

    return {
      items,
      totalCount,
    }
  })

  @modelFlow
  delete = _async(function* (this: TypeRepository, types: Array<IType>) {
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
