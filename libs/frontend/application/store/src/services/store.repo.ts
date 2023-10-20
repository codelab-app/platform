import type { IStoreRepository } from '@codelab/frontend/abstract/application'
import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { Store } from '@codelab/frontend/domain/store'
import type {
  StoreOptions,
  StoreUniqueWhere,
  StoreWhere,
} from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { storeApi } from '../store'

@model('@codelab/StoreRepository')
export class StoreRepository extends Model({}) implements IStoreRepository {
  @modelFlow
  add = _async(function* (this: StoreRepository, store: IStoreModel) {
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
  delete = _async(function* (
    this: StoreRepository,
    stores: Array<IStoreModel>,
  ) {
    const {
      deleteStores: { nodesDeleted },
    } = yield* _await(
      storeApi.DeleteStores({
        delete: Store.toDeleteInput(),
        where: { id_IN: stores.map((store) => store.id) },
      }),
    )

    return nodesDeleted
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
  findOne = _async(function* (this: StoreRepository, where: StoreUniqueWhere) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  update = _async(function* (this: StoreRepository, store: IStoreModel) {
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
}
