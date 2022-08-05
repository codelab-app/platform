import { StoreCreateInput } from '@codelab/shared/abstract/codegen'
import { IStoreDTO } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { CreateStoresDocument } from '../../../../../libs/frontend/modules/store/src/graphql/store.endpoints.graphql.gen'

export const createStore = (input: StoreCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateStoresDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createStores.stores as Array<IStoreDTO>)
