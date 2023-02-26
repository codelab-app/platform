import type {
  IAppDTO,
  ICreateElementData,
  IPageDTO,
} from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'

export const appData: Pick<IAppDTO, 'id' | 'name'> = {
  id: v4(),
  name: 'Codelab',
}

export const pageData: Pick<IPageDTO, 'id' | 'name' | 'appId'> = {
  id: v4(),
  name: 'Home',
  appId: appData.id!,
}

export const buttonElementData: Pick<ICreateElementData, 'id' | 'name'> = {
  id: v4(),
  name: 'Button',
}
