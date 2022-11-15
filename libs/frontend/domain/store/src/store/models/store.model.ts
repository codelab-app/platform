import {
  IInterfaceType,
  IProp,
  IPropData,
  IStore,
  IStoreDTO,
  STATE_PATH_TEMPLATE_REGEX,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { typeRef } from '@codelab/frontend/domain/type'
import { getElementService } from '@codelab/frontend/presenter/container'
import { mapDeep } from '@codelab/shared/utils'
import isString from 'lodash/isString'
import merge from 'lodash/merge'
import { computed, reaction } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { getActionService } from '../action.service'
import {
  hasStateExpression,
  isSingleStateExpression,
  stripStateExpression,
} from './state.utils'

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
      () => [this._actionsRunners, this._defaultValues, this._elementsRefs],
      () => {
        console.debug('Previous state', this.state.values)

        console.debug('actions changed:', this._actionsRunners)
        this.state.setMany(this._actionsRunners)

        console.debug('defaults changed:', this._defaultValues)
        this.state.setMany(this._defaultValues)

        console.debug('elementRefs changed:', this._elementsRefs)
        this.state.setMany(this._elementsRefs)

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
      (x) => x.store.id === this.id,
    )
  }

  @computed
  get _defaultValues() {
    return this.api.current.defaultValues
  }

  @computed
  get _elementsRefs() {
    return getElementService(this).elementsDomRefs
  }

  @computed
  get _actionsRunners() {
    return this.actions
      .map((a) => ({ [a.name]: { run: a.createRunner(this.state) } }))
      .reduce(merge, {})
  }

  @modelAction
  private evaluateExpression(expression: string) {
    try {
      const code = `return ${stripStateExpression(expression)}`

      // eslint-disable-next-line no-new-func
      return new Function(code).call(this.state.values)
    } catch (error) {
      console.log(error)

      return expression
    }
  }

  @modelAction
  public replaceStateInProps = (props: IPropData) => {
    props = mapDeep(
      props,
      // value mapper
      (v, k) => (isString(v) ? this.getByExpression(v) : v),
      // key mapper
      (v, k) => (isString(k) ? this.getByExpression(k) : k) as string,
    )

    return props
  }

  @modelAction
  public getByExpression(key: string) {
    if (!hasStateExpression(key)) {
      return key
    }

    /**
     * return typed value for : {{expression}}
     */
    if (isSingleStateExpression(key)) {
      return this.evaluateExpression(key)
    }

    /**
     * return string value for : [text1]? {{expression1}} [text2]? {{expression2}}...
     */
    return key.replace(STATE_PATH_TEMPLATE_REGEX, (v) =>
      this.evaluateExpression(v),
    )
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
