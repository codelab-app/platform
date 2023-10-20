import type {
  IAppDTO,
  IElementDTO,
  IInterfaceTypeDTO,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { v4 } from 'uuid'

export const storeApiData = (): IInterfaceTypeDTO => ({
  __typename: `${ITypeKind.InterfaceType}`,
  fields: [],
  id: v4(),
  kind: ITypeKind.InterfaceType,
  name: `Test Store API`,
})

export const storeData = (api: IEntity): IStoreDTO => ({
  api,
  id: v4(),
  name: 'Test Store',
})

export const appData = (owner: IEntity): IAppDTO => ({
  id: v4(),
  name: 'Codelab App',
  owner,
})

export const buttonElementData: Pick<IElementDTO, 'id' | 'name'> = {
  id: v4(),
  name: 'Button',
}
