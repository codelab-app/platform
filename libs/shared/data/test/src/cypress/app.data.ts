import type {
  IAppDto,
  IElementDto,
  IInterfaceTypeDto,
  IInterfaceTypeRef,
  IRef,
  IStoreDto,
} from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const storeApiData = (): IInterfaceTypeDto => ({
  __typename: ITypeKind.InterfaceType,
  fields: [],
  id: v4(),
  kind: ITypeKind.InterfaceType,
  name: 'Test Store API',
  owner: {
    id: v4(),
  },
})

export const storeData = (api: IInterfaceTypeRef): IStoreDto => ({
  api,
  id: v4(),
  name: 'Test Store',
})

export const appData = (owner: IRef): IAppDto => ({
  id: v4(),
  name: 'Codelab App',
  owner,
})

export const buttonElementData: Pick<IElementDto, 'id' | 'name'> = {
  id: v4(),
  name: 'Button',
}
