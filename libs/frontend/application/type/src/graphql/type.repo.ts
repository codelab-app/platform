import type {
  BaseTypesOptions,
  ITypeRepository,
} from '@codelab/frontend/abstract/application'
import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import type { IBaseTypeWhere } from '@codelab/shared/abstract/codegen'
import { refValidation } from '@codelab/shared/domain'
import sortBy from 'lodash/sortBy'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  getTypeApi,
  updateTypeApi,
} from '../../../../domain/type/src/repositories/type.api'

@model('@codelab/TypeRepository')
export class TypeRepository extends Model({}) implements ITypeRepository {
  @modelFlow
  add = _async(function* (this: TypeRepository, type: ITypeModel) {
    const createdTypes = yield* _await(
      createTypeApi[type.kind]([type.toCreateInput()]),
    )

    return createdTypes[0]
  })

  @modelFlow
  delete = _async(function* (this: TypeRepository, types: Array<ITypeModel>) {
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

  @modelFlow
  find = _async(function* (this: TypeRepository, where: IBaseTypeWhere) {
    const ids = where.id_IN ?? undefined
    const types = yield* _await(getAllTypes(ids))

    return { aggregate: { count: types.length }, items: types }
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

    if (allDescendantIdsWithoutParents.length === 0) {
      return []
    }

    return yield* _await(getAllTypes(allDescendantIdsWithoutParents))
  })

  @modelFlow
  findOne = _async(function* (this: TypeRepository, where: IBaseTypeWhere) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  findOptions = _async(function* (this: TypeRepository) {
    const {
      baseTypes: { items },
    } = yield* _await(getTypeApi.GetTypeOptions())

    return sortBy(items, 'name')
  })

  @modelFlow
  update = _async(function* (this: TypeRepository, type: ITypeModel) {
    const updatedType = (yield* _await(
      updateTypeApi[type.kind](type.toUpdateInput()),
    ))[0]

    refValidation.asserts(updatedType)

    return updatedType
  })
}
