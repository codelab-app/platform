import { type IStoreService } from '@codelab/frontend/abstract/application'
import { type IStoreModel } from '@codelab/frontend/abstract/domain'
import { storeRepository } from '@codelab/frontend-domain-store/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { type IStoreDto } from '@codelab/shared/abstract/core'
import {
  type StoreFragment,
  type StoreWhere,
} from '@codelab/shared/infra/gqlgen'
import { Validator } from '@codelab/shared/infra/typebox'

export const useStoreService = (): IStoreService => {
  const { actionDomainService, storeDomainService, typeDomainService } =
    useDomainStore()

  const create = async (data: IStoreDto) => {
    const store = storeDomainService.hydrate(data)

    return await storeRepository.add(data)
  }

  const removeMany = async (stores: Array<IStoreModel>) => {
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

    Validator.assertsDefined(store)
    store.writeCache({ name: data.name })

    return await storeRepository.update({ id: store.id }, data)
  }

  const load = (stores: Array<StoreFragment>) => {
    console.debug('StoreService.load()', stores)

    actionDomainService.load(stores.flatMap((store) => store.actions))

    typeDomainService.hydrateTypes(stores.map((store) => store.api))

    return stores.map((store) =>
      storeDomainService.hydrate({ ...store, source: null }),
    )
  }

  return {
    create,
    getAll,
    getOne,
    load,
    removeMany,
    update,
  }
}
