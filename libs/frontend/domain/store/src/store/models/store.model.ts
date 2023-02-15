import type {
  IInterfaceType,
  IProp,
  IStore,
} from '@codelab/frontend/abstract/core'
import {
  IPropData,
  IStoreDTO,
  STATE_PATH_TEMPLATE_REGEX,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { typeRef } from '@codelab/frontend/domain/type'
import {
  evaluateExpression,
  hasStateExpression,
  isSingleStateExpression,
} from '@codelab/frontend/shared/utils'
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

  @modelAction
  writeCache({ id, name, api }: IStoreDTO) {
    this.id = id
    this.name = name
    this.api = typeRef(api.id) as Ref<IInterfaceType>

    return this
  }

  @computed
  get actions() {
    return getActionService(this).actionsList.filter(
      (action) => action.store.id === this.id,
    )
  }

  @computed
  private get _defaultValues() {
    return this.api.current.defaultValues
  }

  @computed
  private get _actionsRunners() {
    return this.actions
      .map((action) => ({
        [action.name]: { run: action.createRunner(this.state) },
      }))
      .reduce(merge, {})
  }

  @modelAction
  public evaluateExpression(
    expression: string,
    context: IPropData = this.state.values,
  ) {
    return evaluateExpression(expression, context)
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
        isString(value) ? this.getByExpression(value, context) : value,
      // key mapper
      (value, key) =>
        (isString(key) ? this.getByExpression(key, context) : key) as string,
    )

    return props
  }

  @modelAction
  public getByExpression(key: string, context: IPropData = this.state.values) {
    if (!hasStateExpression(key)) {
      return key
    }

    /**
     * return typed value for : {{expression}}
     */
    if (isSingleStateExpression(key)) {
      return evaluateExpression(key, context)
    }

    /**
     * return string value for : [text1]? {{expression1}} [text2]? {{expression2}}...
     */
    return key.replace(STATE_PATH_TEMPLATE_REGEX, (value) =>
      evaluateExpression(value, context),
    )
  }

  static hydrate = hydrate
}

export const storeRef = rootRef<IStore>('@codelab/StoreRef', {
  onResolvedValueChange: (ref, newStore, oldStore) => {
    if (oldStore && !newStore) {
      detach(ref)
    }
  },
})
