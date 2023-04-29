import type { IStore, IStoreRepository } from '@codelab/frontend/abstract/core'
import type { StoreOptions, StoreWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { storeApi } from '../store'

@model('@codelab/StoreRepository')
export class StoreRepository extends Model({}) implements IStoreRepository {
  @modelFlow
  add = _async(function* (this: StoreRepository, store: IStore) {
    const {
      createStores: { stores },
    } = yield* _await(
      storeApi.CreateStores({
        input: [store.toCreateInput()],
      }),
    )

    return stores[0]!
  })

  @modelFlow
  update = _async(function* (this: StoreRepository, store: IStore) {
    const {
      updateStores: { stores },
    } = yield* _await(
      storeApi.UpdateStores({
        update: store.toUpdateInput(),
        where: { id: store.id },
      }),
    )

    return stores[0]!
  })

  @modelFlow
  find = _async(function* (
    this: StoreRepository,
    where?: StoreWhere,
    options?: StoreOptions,
  ) {
    return yield* _await(storeApi.GetStores({ options, where }))
  })

  @modelFlow
  delete = _async(function* (this: StoreRepository, stores: Array<IStore>) {
    const {
      deleteStores: { nodesDeleted },
    } = yield* _await(
      storeApi.DeleteStores({
        delete: stores[0]?.toDeleteInput(),
        where: { id_IN: stores.map((store) => store.id) },
      }),
    )

    return nodesDeleted
  })
}
