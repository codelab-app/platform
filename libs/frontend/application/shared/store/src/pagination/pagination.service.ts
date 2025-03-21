import type { Ref } from 'mobx-keystone'

import {
  getRouterService,
  type IPaginationService,
  type SupportedPaginationModel,
} from '@codelab/frontend/abstract/application'
import { computed } from 'mobx'
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
import { sortBy } from 'remeda'

@model('@codelab/PaginationService')
export class PaginationService<T1 extends SupportedPaginationModel>
  extends Model(<T2 extends SupportedPaginationModel>() => ({
    dataRefs: prop(() => objectMap<Ref<T2>>()),
    // Make initial true so we know data is not there yet
    isLoading: prop(true).withSetter(),
    /**
     * We want to conditionally show a loader when transitioning between pages
     */
    isLoadingBetweenPages: prop(false).withSetter(),
    totalItems: prop<number>(0).withSetter(),
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

  @modelAction
  setData(data: Array<T1>, totalItems: number) {
    this.dataRefs.clear()
    this.setTotalItems(totalItems)

    data.forEach((item) => {
      this.dataRefs.set(item.id, paginationServiceRef(item.id) as Ref<T1>)
    })

    this.setIsLoading(false)
    this.setIsLoadingBetweenPages(false)
  }

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
