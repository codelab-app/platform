import {
  type GetDataFn,
  getRouterService,
  type IPaginationService,
  type SupportedPaginationModel,
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
  modelFlow,
  objectMap,
  prop,
  rootRef,
} from 'mobx-keystone'

export const paginationContext = createContext<{
  getDataFn(
    page: number,
    pageSize: number,
    filter: Array<string>,
    search: string,
  ): Promise<{ items: Array<SupportedPaginationModel>; totalItems: number }>
}>()

@model('@codelab/PaginationService')
export class PaginationService<T1 extends SupportedPaginationModel>
  extends Model(<T2 extends SupportedPaginationModel>() => ({
    dataRefs: prop(() => objectMap<Ref<T2>>()),
    // Make initial true so we know data is not there yet
    isLoading: prop(true),
    totalItems: prop<number>(0),
  }))<T1>
  implements IPaginationService<T1>
{
  @computed
  get data() {
    return sortBy(Array.from(this.dataRefs.values()), (ref) =>
      ref.current.name.toLowerCase(),
    ).map((ref) => ref.current)
  }

  @computed
  get totalPages() {
    return Math.ceil(this.totalItems / this.routerService.pageSize)
  }

  @modelFlow
  getData = _async(function* (this: PaginationService<T1>) {
    this.isLoading = true

    const context = paginationContext.get(this)

    if (!context) {
      throw new Error('getDataContext is not set')
    }

    const getDataFn = context.getDataFn as GetDataFn<T1>

    const { items, totalItems } = yield* _await(
      getDataFn(
        this.routerService.page,
        this.routerService.pageSize,
        this.routerService.filter,
        this.routerService.search,
      ),
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

  @computed
  private get routerService() {
    return getRouterService(this)
  }
}

const paginationServiceRef = rootRef('@codelab/PaginationServiceRef', {
  onResolvedValueChange: (ref, newComponent, oldComponent) => {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})
