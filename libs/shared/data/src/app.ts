import {
  ICreateAppDTO,
  ICreateElementDTO,
  ICreatePageDTO,
} from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'

export const appData: Pick<ICreateAppDTO, 'id' | 'name'> = {
  id: v4(),
  name: 'Codelab',
}

export const pageData: Pick<ICreatePageDTO, 'id' | 'name' | 'appId'> = {
  id: v4(),
  name: 'Home',
  appId: appData.id!,
}

export const buttonElementData: Pick<ICreateElementDTO, 'id' | 'name'> = {
  id: v4(),
  name: 'Button',
}
