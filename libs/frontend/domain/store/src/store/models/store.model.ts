import type {
  IAnyAction,
  IApp,
  IAppDTO,
  IInterfaceType,
  IProp,
  IStore,
  IStoreDTO,
} from '@codelab/frontend/abstract/core'
import { IPropData } from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { InterfaceType, typeRef } from '@codelab/frontend/domain/type'
import { getByExpression } from '@codelab/frontend/shared/utils'
import type { StoreCreateInput } from '@codelab/shared/abstract/codegen'
import { mapDeep } from '@codelab/shared/utils'
import isString from 'lodash/isString'
import merge from 'lodash/merge'
import { computed, reaction } from 'mobx'
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
import { v4 } from 'uuid'
import { getActionService } from '../action.service'

export const hydrate = ({ id, name, api }: IStoreDTO) =>
  new Store({
    id,
    name,
    api: typeRef(api.id) as Ref<IInterfaceType>,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    api: prop<Ref<IInterfaceType>>().withSetter(),
    state: prop<IProp>(() => new Prop({})),
    actions: prop<Array<Ref<IAnyAction>>>(() => []),
  }))
  implements IStore
{
  onAttachedToRootStore() {
    // every time the snapshot of the configuration changes
    const reactionDisposer = reaction(
      () => [this._actionsRunners, this._defaultValues],
      () => {
        console.debug('Previous state', this.state.values)

        console.debug('actions changed:', this._actionsRunners)
        this.state.setMany(this._actionsRunners)

        console.debug('defaults changed:', this._defaultValues)
        this.state.setMany(this._defaultValues)

        console.debug('New state', this.state.values)
      },
      { fireImmediately: true },
    )

    // when the model is no longer part of the root store stop
    return () => {
      reactionDisposer()
    }
  }

  // @modelAction
  // create({ id, name, api, actions }: IStoreDTO) {
  //   this.id = id
  //   this.name = name
  //   this.api = typeRef(api.id) as Ref<IInterfaceType>

  //   return this
  // }

  @computed
  private get _defaultValues() {
    return this.api.current.defaultValues
  }

  @computed
  private get _actionsRunners() {
    return this.actions
      .map((action) => ({
        [action.current.name]: { run: action.current.createRunner(this.state) },
      }))
      .reduce(merge, {})
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

  static hydrate = hydrate

  toCreateInput(): StoreCreateInput {
    const api = this.api.current

    return {
      id: this.id,
      name: this.name,
      api: {
        create: {
          node: api.toCreateInput(),
        },
      },
    }
  }

  static createName(app: IAppDTO) {
    return `${app.name} Store`
  }

  static createStoreData(app: Pick<IApp, 'name' | 'owner'>): StoreCreateInput {
    return {
      id: v4(),
      name: `${app.name} Store`,
      api: {
        create: {
          node: InterfaceType.createApiNode({
            name: `${app.name} Store`,
            owner: app.owner,
          }),
        },
      },
    }
  }
}

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange: (ref, newStore, oldStore) => {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
