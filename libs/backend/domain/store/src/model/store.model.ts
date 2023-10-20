import { ActionFactory } from '@codelab/backend/domain/action'
import { InterfaceType } from '@codelab/backend/domain/type'
import type {
  IAction,
  IInterfaceTypeRef,
  IStore,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { v4 } from 'uuid'

export class Store implements IStore {
  static create(name: string) {
    const api = new InterfaceType({
      fields: [] as Array<IEntity>,
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

  actions: Array<IAction>

  api: IInterfaceTypeRef

  id: string

  name: string

  constructor({ actions = [], api, id, name }: IStoreDTO) {
    this.api = api
    this.id = id
    this.actions = actions.map((action) => ActionFactory.create(action))
    this.name = name
  }
}
