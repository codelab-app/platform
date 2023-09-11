import { InterfaceType } from '@codelab/backend/domain/type'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { v4 } from 'uuid'

export class Store implements IStoreDTO {
  actions?: Array<IEntity> | undefined

  api: IEntity

  id: string

  name: string

  constructor({ api, id, name }: IStoreDTO) {
    this.api = api
    this.id = id
    this.name = name
  }

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
}
