import type {
  IAppDTO,
  IAuth0Owner,
  ICreateElementData,
  IElementDTO,
  IInterfaceTypeDTO,
  IPageDTO,
  IStoreDTO,
} from '@codelab/frontend/abstract/core'
import { IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const storeApiData = (owner: IAuth0Owner): IInterfaceTypeDTO => ({
  __typename: `${ITypeKind.InterfaceType}`,
  fields: [],
  id: v4(),
  kind: ITypeKind.InterfaceType,
  name: 'Test Store API',
  owner,
})

export const storeData: IStoreDTO = {
  api: { id: v4() },
  id: v4(),
  name: 'Test Store',
}

export const appData = (owner: IAuth0Owner): IAppDTO => ({
  id: v4(),
  name: 'Codelab App',
  owner,
  store: storeData,
})

export const buttonElementData: Pick<ICreateElementData, 'id' | 'name'> = {
  id: v4(),
  name: 'Button',
}
