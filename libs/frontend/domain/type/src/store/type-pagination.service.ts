import type { IType, ITypePagination } from '@codelab/frontend/abstract/core'
import { computed } from 'mobx'
import { getSnapshot, Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { typeRef } from './models'
import { getTypeService } from './type.service.context'

@model('@codelab/TypePaginationService')
export class TypePaginationService
  extends Model({
    currentPage: prop(1).withSetter(),
    data: prop(() => objectMap<Ref<IType>>()),
    pageSize: prop(25).withSetter(),
    search: prop(() => ({
      name: undefined,
    })).withSetter(),
    total: prop<number | undefined>(),
  })
  implements ITypePagination
{
  @computed
  get typeService() {
    return getTypeService(this)
  }

  /**
   * Ref doesn't change even if source changes
   *
   * https://github.com/xaviergonz/mobx-keystone/issues/390#issuecomment-1039640677
   */
  @computed
  get types() {
    return Array.from(this.data.values()).map(
      (type) => getSnapshot(type.current) as IType,
    )
  }

  @computed
  get offset() {
    return (this.currentPage - 1) * this.pageSize
  }

  /**
   * `page` & `pageSize` are optional
   */
  @modelFlow
  @transaction
  getPaginatedTypes = _async(function* (this: TypePaginationService) {
    /**
     * We need to get base types in order to get the order
     */
    const { items, totalCount } = yield* _await(
      this.typeService.typeRepository.findBaseTypes({
        limit: this.pageSize,
        offset: this.offset,
        where: this.search,
      }),
    )

    this.total = totalCount

    const typeIds = items.map(({ id }) => id)
    const types = yield* _await(this.typeService.getAll(typeIds))

    this.data.clear()

    types.forEach((type) => {
      this.data.set(type.id, typeRef(type))
    })

    return types
  })
}
