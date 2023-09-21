import type {
  Filterables,
  IPaginationService,
  SupportedPaginationModel,
} from '@codelab/frontend/abstract/core'
import sortBy from 'lodash/sortBy'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  detach,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  rootRef,
} from 'mobx-keystone'

@model('@codelab/PaginationService')
export class PaginationService<
    T1 extends SupportedPaginationModel,
    U1 extends Filterables | void = void,
  >
  extends Model(<
    T2 extends SupportedPaginationModel,
    U2 extends Filterables | void = void,
  >() => ({
    currentPage: prop(1).withSetter(),
    dataRefs: prop(() => objectMap<Ref<T2>>()),
    filter: prop(() => ({} as U2)).withSetter(),
    isLoading: prop(false),
    pageSize: prop(20).withSetter(),
    totalItems: prop<number>(0),
  }))<T1, U1>
  implements IPaginationService<T1, U1>
{
  /**
   * This can't be passed as props when creating a PaginationService instance so this has to be initialized in the `onAttachedToRootStore` of the service using this
   */
  getDataFn = async (page: number, pageSize: number, filter: U1) => ({
    items: [] as Array<T1>,
    totalItems: 0,
  })

  @computed
  get data() {
    return sortBy(Array.from(this.dataRefs.values()), (ref) =>
      ref.current.name.toLowerCase(),
    ).map((ref) => ref.current)
  }

  @modelFlow
  getData = _async(function* (this: PaginationService<T1, U1>) {
    this.isLoading = true

    const { items, totalItems } = yield* _await(
      this.getDataFn(this.currentPage, this.pageSize, this.filter),
    )

    this.totalItems = totalItems

    this.dataRefs.clear()

    items.forEach((type) => {
      this.dataRefs.set(type.id, paginationServiceRef(type.id) as Ref<T1>)
    })

    this.isLoading = false

    return items
  })
}

const paginationServiceRef = rootRef('@codelab/PaginationServiceRef', {
  onResolvedValueChange: (ref, newComponent, oldComponent) => {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})
