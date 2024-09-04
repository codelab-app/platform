import type {
  Filterables,
  IPaginationService,
  SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'
import sortBy from 'lodash/sortBy'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  createContext,
  detach,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  rootRef,
} from 'mobx-keystone'

export const paginationContext = createContext<{
  getDataFn<T extends SupportedPaginationModel>(
    page: number,
    pageSize: number,
    filter: Filterables,
  ): Promise<{ items: Array<T>; totalItems: number }>
}>()

@model('@codelab/PaginationService')
export class PaginationService<
    T1 extends SupportedPaginationModel,
    U1 extends Filterables,
  >
  extends Model(<
    T2 extends SupportedPaginationModel,
    U2 extends Filterables,
  >() => ({
    dataRefs: prop(() => objectMap<Ref<T2>>()),
    // Make initial true so we know data is not there yet
    isLoading: prop(true),
    totalItems: prop<number>(0),
  }))<T1, U1>
  implements IPaginationService<T1, U1>
{
  @computed
  get data() {
    return sortBy(Array.from(this.dataRefs.values()), (ref) =>
      ref.current.name.toLowerCase(),
    ).map((ref) => ref.current)
  }

  @computed
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize)
  }

  @modelFlow
  getData = _async(function* (this: PaginationService<T1, U1>) {
    console.log(this.currentPage, this.pageSize)

    this.isLoading = true

    const context = paginationContext.get(this)

    if (!context) {
      throw new Error('getDataContext is not set')
    }

    const { items, totalItems } = yield* _await(
      context.getDataFn<T1>(this.currentPage, this.pageSize, this.filter),
    )

    this.totalItems = totalItems

    this.dataRefs.clear()

    items.forEach((item) => {
      this.dataRefs.set(item.id, paginationServiceRef(item.id) as Ref<T1>)
    })

    this.isLoading = false

    return items
  })

  /**
   * This can't be passed as props when creating a PaginationService instance so this has to be initialized in the `onAttachedToRootStore` of the service using this
   */
  // @modelFlow
  // getDataFn = _async(function* (
  //   this: PaginationService<T1, U1>,
  //   page: number,
  //   pageSize: number,
  //   filter: U1,
  // ) {
  //   return yield* _await(
  //     Promise.resolve({
  //       items: [] as Array<T1>,
  //       totalItems: 0,
  //     }),
  //   )
  // })
}

const paginationServiceRef = rootRef('@codelab/PaginationServiceRef', {
  onResolvedValueChange: (ref, newComponent, oldComponent) => {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})
