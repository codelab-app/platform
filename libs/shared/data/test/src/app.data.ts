import type {
  IAppDTO,
  ICreateElementData,
  IPageDTO,
  IStoreDTO,
} from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'

export const storeData: IStoreDTO = {
  api: { id: v4() },
  id: v4(),
  name: 'Test Store',
}

export const appData: IAppDTO = {
  id: v4(),
  name: 'Codelab',
  owner: {
    auth0Id: v4(),
  },
  store: storeData,
}

export const pageData: Pick<IPageDTO, 'app' | 'id' | 'name'> = {
  app: appData,
  id: v4(),
  name: 'Home',
}

export const buttonElementData: Pick<ICreateElementData, 'id' | 'name'> = {
  id: v4(),
  name: 'Button',
}
