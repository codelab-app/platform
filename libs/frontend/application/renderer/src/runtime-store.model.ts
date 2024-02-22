import {
  getRendererService,
  type IRuntimeActionModel,
  type IRuntimeStoreDTO,
  type IRuntimeStoreModel,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { actionRef, isAtomRef } from '@codelab/frontend/abstract/domain'
import { propSafeStringify } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import { computed, observable, set } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import {
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { RuntimeActionModel } from './runtime-action.model'

const create = (dto: IRuntimeStoreDTO) => new RuntimeStoreModel(dto)

@model('@codelab/RuntimeStore')
export class RuntimeStoreModel
  extends Model(() => ({
    id: idProp,
    runtimeActions: prop<ObjectMap<IRuntimeActionModel>>(() => objectMap([])),
    runtimeProviderStore: prop<Maybe<Ref<IRuntimeStoreModel>>>(),
    store: prop<Ref<IStoreModel>>(),
  }))
  implements IRuntimeStoreModel
{
  static create = create

  @computed
  get jsonString() {
    return propSafeStringify({
      refs: this.refs,
      state: this.state,
    })
  }

  private cachedStateDefaultValues: Nullable<object> = null

  refs = observable.object<IPropData>({})

  @computed
  get refKeys(): Array<string> {
    const elementTree =
      this.store.current.page?.maybeCurrent ||
      this.store.current.component?.maybeCurrent

    const elements = elementTree?.elements || []

    return elements
      .filter((element) => isAtomRef(element.renderType))
      .map(({ slug }) => slug)
  }

  @computed
  get renderer() {
    return this.renderService.activeRenderer?.current
  }

  @computed
  get state() {
    // cachedState is for persisting state when navigating between pages
    // cachedStateDefaultValues is for checking if the default values have changed or new variables have been added
    if (
      !this.cachedState ||
      !isEqual(
        this.cachedStateDefaultValues,
        this.store.current.api.current.defaultValues,
      )
    ) {
      const defaultValues = this.store.current.api.current.defaultValues

      this.cachedState = observable(defaultValues)
      this.cachedStateDefaultValues = cloneDeep(defaultValues)
    }

    return this.cachedState
  }

  @computed
  get runtimeActionsList() {
    const actions = [...this.runtimeActions.values()]

    return this.store.current.actions.map((action) => {
      const found = actions.find((existing) => existing.action.id === action.id)

      if (found) {
        return found
      }

      const runtimeAction = RuntimeActionModel.create({
        action: actionRef(action.id),
        runtimeStore: runtimeStoreRef(this.id),
      })

      this.runtimeActions.set(runtimeAction.id, runtimeAction)

      return runtimeAction
    })
  }

  @computed
  get state() {
    // To update the cache if a new state variable is added
    const apiFieldsLength = this.store.current.api.maybeCurrent?.fields.length
    const cachedStateKeysLength = Object.keys(this.cachedState ?? {}).length

    // cachedState is for persisting state when navigating between pages
    if (!this.cachedState || apiFieldsLength !== cachedStateKeysLength) {
      this.cachedState = observable(
        this.store.current.api.maybeCurrent?.defaultValues ?? {},
      )
    }

    return this.cachedState
  }

  refs = observable.object<IPropData>({})

  @modelAction
  createEmptyRefs(refKeys: Array<string>) {
    refKeys.forEach((key: string) => {
      this.registerRef(key, null)
    })
  }

  @modelAction
  deleteUnusedRefs() {
    keys(this.refs).forEach((key) => {
      if (!this.refKeys.includes(key)) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.refs[key]
      }
    })
  }

  @modelAction
  registerRef(key: string, current: Nullable<HTMLElement>) {
    set(this.refs, { [key]: { current } })
  }

  @modelAction
  runtimeAction(action: IRef) {
    const foundAction = this.runtimeActionsList.find(
      (runtimeAction) => runtimeAction.action.id === action.id,
    )

    return (
      foundAction || this.runtimeProviderStore?.current.runtimeAction(action)
    )
  }

  private cachedState: Nullable<object> = null

  @computed
  private get renderService() {
    return getRendererService(this)
  }
}
