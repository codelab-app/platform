import type {
  Filterables,
  IPaginationService,
  SupportedModel,
} from '@codelab/frontend/abstract/core'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  detach,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  rootRef,
} from 'mobx-keystone'

@model('@codelab/PaginationService')
export class PaginationService<
    T1 extends SupportedModel,
    U1 extends Filterables | void = void,
  >
  extends Model(<
    T2 extends SupportedModel,
    U2 extends Filterables | void = void,
  >() => ({
    data: prop(() => [] as Array<T2>),
    dataRefs: prop(() => objectMap<Ref<T2>>()),
    filter: prop(() => ({} as U2)).withSetter(),
    isLoading: prop(false),
    page: prop(1).withSetter(),
    pageSize: prop(20).withSetter(),
    totalItems: prop<number | undefined>(),
  }))<T1, U1>
  implements IPaginationService<T1, U1>
{
  ref = rootRef<T1>('@codelab/PaginationServiceRef', {
    onResolvedValueChange: (ref, newType, oldType) => {
      if (oldType && !newType) {
        detach(ref)
      }
    },
  })

  getDataFn = async (page: number, pageSize: number, filter: U1) => ({
    items: [] as Array<T1>,
    totalItems: 0,
  })

  @computed
  get data() {
    return Array.from(this.dataRefs.values()).map((ref) => ref.current)
  }

  @modelFlow
  getData = _async(function* (this: PaginationService<T1, U1>) {
    this.isLoading = true

    const { items, totalItems } = yield* _await(
      this.getDataFn(this.page, this.pageSize, this.filter),
    )

    this.totalItems = totalItems

    this.dataRefs.clear()

    items.forEach((type) => {
      this.dataRefs.set(type.id, this.ref(type.id))
    })

    this.isLoading = false

    return items
  })

  @modelAction
  public setGetDataFn(
    fn: (
      page: number,
      pageSize: number,
      filter: U1,
    ) => Promise<{ items: Array<T1>; totalItems: number }>,
  ) {
    this.getDataFn = fn
  }
}
