import type {
  IAction,
  IInterfaceType,
  IProp,
  IStore,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { typeRef } from '@codelab/frontend/domain/type'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO, IStoreDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'
import { actionRef } from './action.ref'

const create = ({ api, id, name }: IStoreDTO) => {
  new Store({
    api: typeRef(api.id) as Ref<IInterfaceType>,
    id,
    name,
  })
}

const createName = (app: Pick<IAppDTO, 'name'>) => {
  return `${app.name} Store`
}

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    actions: prop<Array<Ref<IAction>>>(() => []),
    api: prop<Ref<IInterfaceType>>().withSetter(),
    id: idProp,
    name: prop<string>(),
    state: prop<IProp>(() => new Prop({})),
  }))
  implements IStore
{
  @modelAction
  writeCache({ actions, api, id, name }: Partial<IStoreDTO>) {
    this.id = id ? id : this.id
    this.name = name ? name : this.name
    this.api = api ? (typeRef(api.id) as Ref<IInterfaceType>) : this.api
    this.actions = actions
      ? actions.map((action) => actionRef(action.id))
      : this.actions

    return this
  }

  @computed
  get jsonString() {
    return ''
  }

  static create = create

  toCreateInput(): StoreCreateInput {
    const api = this.api.current

    return {
      api: {
        create: {
          node: api.toCreateInput(),
        },
      },
      id: this.id,
      name: this.name,
    }
  }

  toUpdateInput(): StoreUpdateInput {
    return { name: this.name }
  }

  toDeleteInput(): StoreDeleteInput {
    return {
      actions: {
        ApiAction: [{ where: {} }],
        CodeAction: [{ where: {} }],
      },
      api: { where: {} },
    }
  }

  static createName = createName
}

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange: (ref, newStore, oldStore) => {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
