import type {
  IAction,
  IInterfaceTypeRef,
  IStore,
  IStoreDto,
} from '@codelab/shared/abstract/core'

import { ActionModelFactory } from '@codelab/backend/domain/action'
import { InterfaceType } from '@codelab/backend/domain/type'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { createStoreName } from '@codelab/shared/domain'
import { v4 } from 'uuid'

export class Store implements IStore {
  static create(name: string) {
    const api = new InterfaceType({
      __typename: ITypeKind.InterfaceType,
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: `${name} API`,
    })

    return new Store({
      api,
      id: v4(),
      name,
    })
  }

  static createName = createStoreName

  actions: Array<IAction>

  api: IInterfaceTypeRef

  id: string

  name: string

  constructor({ actions = [], api, id, name }: IStoreDto) {
    this.api = {
      ...api,
      __typename: ITypeKind.InterfaceType,
    }
    this.id = id
    this.actions = actions.map((action) => ActionModelFactory.create(action))
    this.name = name
  }
}
