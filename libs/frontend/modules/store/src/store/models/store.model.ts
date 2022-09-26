import { getTypeService } from '@codelab/frontend/modules/type'
import {
  IAnyAction,
  IInterfaceType,
  IPropData,
  IStore,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import { merge } from 'lodash'
import { computed } from 'mobx'
import {
  detach,
  frozen,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { actionRef } from './action.ref'

export const hydrate = ({ actions, id, name, api }: IStoreDTO) =>
  new Store({
    id,
    name,
    actions: actions.map((action) => actionRef(action.id)),
    apiId: api.id,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    actions: prop<Array<Ref<IAnyAction>>>().withSetter(),
    apiId: prop<string>().withSetter(),
    state: prop<IPropData>(() => frozen<IPropData>({})),
  }))
  implements IStore
{
  @modelAction
  setState(data: IPropData) {
    this.state = frozen(data)
  }

  @modelAction
  updateState(data: IPropData) {
    this.state = frozen(merge(this.state.data, data))
  }

  @modelAction
  writeCache({ id, name, actions, api }: IStoreDTO) {
    this.id = id
    this.name = name
    this.actions = actions.map((a) => actionRef(a.id))
    this.apiId = api.id

    return this
  }

  @computed
  get _api() {
    const typeService = getTypeService(this)

    return typeService.type(this.apiId) as IInterfaceType
  }

  @computed
  get _storeActions() {
    return this.actions
      .map((a) => ({
        [a.current.name]: {
          run: a.current.createRunner(this.state, this.updateState.bind(this)),
        },
      }))
      .reduce(merge, {})
  }

  static hydrate = hydrate
}

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
