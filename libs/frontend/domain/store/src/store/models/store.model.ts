import type {
  IAction,
  IAppDTO,
  IInterfaceType,
  IStore,
  IStoreDTO,
} from '@codelab/frontend/abstract/core'
import { IPropData } from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/domain/type'
import { getByExpression } from '@codelab/frontend/shared/utils'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { mapDeep } from '@codelab/shared/utils'
import isString from 'lodash/isString'
import merge from 'lodash/merge'
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
import { types } from 'mobx-state-tree'
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
  get state() {
    const storeModel = types
      .model(this.name, this.api.current.defaultValues)
      .actions((store) =>
        this.actions
          .map((action) => ({
            [action.current.name]: action.current.createRunner().bind(store),
          }))
          .reduce(merge, {}),
      )

    return storeModel.create()
  }

  @computed
  get jsonString() {
    return JSON.stringify(this.state)
  }

  @modelAction
  public replaceStateInProps(
    props: IPropData,
    context: IPropData = this.state.values,
  ) {
    props = mapDeep(
      props,
      // value mapper
      (value, key) =>
        isString(value) ? getByExpression(value, context) : value,
      // key mapper
      (value, key) =>
        (isString(key) ? getByExpression(key, context) : key) as string,
    )

    return props
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
