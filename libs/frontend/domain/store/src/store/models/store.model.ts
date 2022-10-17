import {
  IApp,
  IInterfaceType,
  IProp,
  IPropData,
  IStore,
  IStoreDTO,
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_REGEX,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { typeRef } from '@codelab/frontend/domain/type'
import isString from 'lodash/isString'
import merge from 'lodash/merge'
import { computed } from 'mobx'
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

const matchesTemplate = (str: string): boolean =>
  isString(str) &&
  str.includes(STATE_PATH_TEMPLATE_START) &&
  str.includes(STATE_PATH_TEMPLATE_END)

const isSingleExpression = (str: string) =>
  str.startsWith(STATE_PATH_TEMPLATE_START) &&
  str.endsWith(STATE_PATH_TEMPLATE_END)

const stripExpression = (expression: string) =>
  expression.substring(2, expression.length - 2)

const evaluateExpression = (expression: string, state: IPropData) => {
  try {
    // eslint-disable-next-line no-new-func
    return new Function(`return ${stripExpression(expression)}`).call(state)
  } catch (error) {
    console.log(error)

    return expression
  }
}

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
    _state: prop<IProp>(() => new Prop({})),
  }))
  implements IStore
{
  @modelAction
  writeCache({ id, name, api }: IStoreDTO) {
    this.id = id
    this.name = name
    this.api = typeRef(api.id) as Ref<IInterfaceType>

    return this
  }

  @computed
  get state() {
    return merge({
      ...this._state.values,
      ...this._runnableActions,
      ...this._defaultValues,
    })
  }

  @computed
  get actions() {
    return getActionService(this).actionsList.filter(
      (x) => x.storeId === this.id,
    )
  }

  @computed
  get _defaultValues() {
    return this.api.current.fieldList
      .map((x) => ({ [x.key]: [] }))
      .reduce(merge, {})
  }

  @computed
  get _runnableActions() {
    return this.actions
      .map((a) => ({ [a.name]: { run: a.createRunner(this._state) } }))
      .reduce(merge, {})
  }

  @modelAction
  initState(apps: Array<IApp>) {
    this._state.setMany(apps.map((a) => a.toJson).reduce(merge, {}))
  }

  @modelAction
  getState = (value: string) => {
    if (!matchesTemplate(value)) {
      return value
    }

    /**
     * return typed value for : {{expression}}
     */
    if (isSingleExpression(value)) {
      return evaluateExpression(value, this.state)
    }

    /**
     * return string value for : [text1]? {{expression1}} [text2]? {{expression2}}...
     */
    return value.replace(STATE_PATH_TEMPLATE_REGEX, (v) =>
      evaluateExpression(v, this.state),
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
