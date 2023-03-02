import type {
  IAppDTO,
  ICreateElementData,
  IPageDTO,
  IStoreDTO,
} from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'

export const storeData: IStoreDTO = {
  id: v4(),
  name: 'Test Store',
  api: { id: v4() },
}

export const appData: IAppDTO = {
  id: v4(),
  name: 'Codelab',
  owner: {
    auth0Id: v4(),
  },
  store: storeData,
}

export const pageData: Pick<IPageDTO, 'id' | 'name' | 'app'> = {
  id: v4(),
  name: 'Home',
  app: appData,
}

export const buttonElementData: Pick<ICreateElementData, 'id' | 'name'> = {
  id: v4(),
  name: 'Button',
}
