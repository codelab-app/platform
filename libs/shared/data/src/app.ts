import {
  ICreateAppDTO,
  ICreateElementDTO,
  ICreatePageDTO,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const appData: Omit<ICreateAppDTO, 'auth0Id'> = {
  id: v4(),
  name: 'Codelab',
}

export const pageData: ICreatePageDTO = {
  id: v4(),
  name: 'Home',
  appId: appData.id!,
}

export const buttonElementData: ICreateElementDTO = {
  id: v4(),
  name: 'Button',
}
