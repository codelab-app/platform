import { Prop } from '@codelab/frontend/modules/element'
import { getTypeService, InterfaceType } from '@codelab/frontend/modules/type'
import {
  IAnyAction,
  IProp,
  IStore,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import { merge } from 'lodash'
import { makeAutoObservable } from 'mobx'
import {
  _async,
  _await,
  detach,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { actionRef } from './action.ref'

export const hydrate = ({
  actions,
  id,
  name,
  state,
  stateApi,
}: Omit<IStoreDTO, '__typename'>) =>
  new Store({
    id,
    name,
    actions: actions.map((action) => actionRef(action.id)),
    state: Prop.hydrate(state),
    stateApiId: stateApi.id,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    actions: prop<Array<Ref<IAnyAction>>>().withSetter(),
    state: prop<IProp>(),
    stateApiId: prop<string>().withSetter(),
  }))
  implements IStore
{
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  @modelAction
  updateCache({
    id,
    name,
    actions,
    state,
    stateApi,
  }: Omit<IStoreDTO, '__typename'>) {
    this.id = id
    this.name = name
    this.actions = actions.map((a) => actionRef(a.id))
    this.stateApiId = stateApi.id
    this.state.updateCache(state)

    return this
  }

  @modelFlow
  toMobxObservable = _async(function* (this: Store, globals: any = {}) {
    const typeService = getTypeService(this)
    const stateApi = typeService.type(this.stateApiId) as InterfaceType

    const storeState = [...stateApi.fields.values()].map((field) => ({
      [field.key]: this.state.values[field.key],
    }))

    const storeActions = yield* _await(
      Promise.all(
        this.actions.map(async ({ current: action }) => ({
          [action.name]: {
            run: await action.run(),
            type: action.type,
            isAction: true,
          },
        })),
      ),
    )

    return makeAutoObservable(
      merge({}, ...storeState, storeActions.reduce(merge, {}), globals),
    )
  })

  static hydrate = hydrate
}

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange(ref, newStore, oldStore) {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
