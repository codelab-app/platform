import { type IStoreService } from '@codelab/frontend/abstract/application'
import { type IStoreModel } from '@codelab/frontend/abstract/domain'
import { storeRepository } from '@codelab/frontend-domain-store/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  type StoreFragment,
  type StoreWhere,
} from '@codelab/shared/abstract/codegen'
import { type IStoreDto } from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'

export const useStoreService = (): IStoreService => {
  const { actionDomainService, storeDomainService, typeDomainService } =
    useDomainStore()

  const create = async (data: IStoreDto) => {
    const store = storeDomainService.hydrate(data)

    await storeRepository.add(store)

    return store
  }

  const remove = async (stores: Array<IStoreModel>) => {
    stores.forEach((store) => {
      storeDomainService.stores.delete(store.id)
    })

    return await storeRepository.delete(stores)
  }

  const getAll = async (where: StoreWhere) => {
    const { items: stores } = await storeRepository.find(where)

    return load(stores)
  }

  const getOne = async (id: string) => {
    if (storeDomainService.stores.has(id)) {
      return storeDomainService.stores.get(id)
    }

    const all = await getAll({ id })

    return all[0]
  }

  const update = async (data: IStoreDto) => {
    const store = storeDomainService.stores.get(data.id)

    assertIsDefined(store)
    store.writeCache({ name: data.name })
    await storeRepository.update(store)

    return store
  }

  const load = (stores: Array<StoreFragment>) => {
    console.debug('StoreService.load()', stores)

    actionDomainService.load(stores.flatMap((store) => store.actions))

    typeDomainService.hydrateTypes({
      interfaceTypes: stores.map((store) => store.api),
    })

    return stores.map((store) =>
      storeDomainService.hydrate({ ...store, source: null }),
    )
  }

  const store = (id: string) => {
    return storeDomainService.stores.get(id)
  }

  return {
    create,
    getAll,
    getOne,
    load,
    remove,
    store,
    update,
  }
}
