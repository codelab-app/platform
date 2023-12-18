import type {
  IRuntimeActionModel,
  IRuntimeStoreDTO,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  RendererType,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { actionRef, isAtomRef } from '@codelab/frontend/abstract/domain'
import { propSafeStringify } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { IRef } from '@codelab/shared/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import keys from 'lodash/keys'
import { autorun, computed, observable, set } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import {
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { RuntimeActionModel } from './runtime-action.model'

const create = ({ id, runtimeProviderStore, store }: IRuntimeStoreDTO) => {
  return new RuntimeStoreModel({
    id,
    runtimeProviderStore,
    store,
  })
}

@model('@codelab/RuntimeStore')
export class RuntimeStoreModel
  extends Model(() => ({
    id: idProp,
    runtimeActions: prop<ObjectMap<IRuntimeActionModel>>(() => objectMap()),
    runtimeProviderStore: prop<Maybe<Ref<IRuntimeStoreModel>>>(),
    store: prop<Ref<IStoreModel>>(),
  }))
  implements IRuntimeStoreModel
{
  static create = create

  refs = observable.object<IPropData>({})

  onAttachedToRootStore() {
    this.createEmptyRefs(this.refKeys)
    autorun(() => this.deleteUnusedRefs())
  }

  // private cachedState: Nullable<object> = null

  @computed
  get renderer() {
    const renderService = getRendererService(this)

    return renderService.activeRenderer?.current
  }

  @computed
  get state() {
    const { rendererType } = this.renderer ?? {}

    const isPreviewOrProduction =
      rendererType === RendererType.Preview ||
      rendererType === RendererType.Production

    /*  
    if (isPreviewOrProduction && this.cachedState) {
      return this.cachedState
    }

    this.cachedState = observable(
      this.store.current.api.maybeCurrent?.defaultValues ?? {},
    )

    return this.cachedState
*/
    return this.store.current.api.maybeCurrent?.defaultValues ?? {}
  }

  @computed
  get jsonString() {
    return propSafeStringify({
      refs: this.refs,
      state: this.state,
    })
  }

  @computed
  get refKeys(): Array<string> {
    // refs might fail to resolve at the beginning
    const elementTree =
      this.store.maybeCurrent?.page?.maybeCurrent ||
      this.store.maybeCurrent?.component?.maybeCurrent

    const elements = elementTree?.elements || []

    return elements
      .filter((element) => isAtomRef(element.renderType))
      .map(({ slug }) => slug)
  }

  @modelAction
  registerRef(key: string, current: Nullable<HTMLElement>) {
    set(this.refs, { [key]: { current } })
  }

  @modelAction
  runtimeAction(action: IRef): Maybe<IRuntimeActionModel> {
    return (
      // either find it in here
      this.runtimeActionsList.find((item) => item.action.id === action.id) ??
      // or search in parent store if it has one
      this.runtimeProviderStore?.current.runtimeAction(action)
    )
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

  createEmptyRefs(refKeys: Array<string>) {
    refKeys.forEach((key: string) => {
      this.registerRef(key, null)
    })
  }

  @computed
  get runtimeActionsList() {
    const storeActions = this.store.current.actions
    const actionsChanged = this.runtimeActions.size !== storeActions.length

    if (!actionsChanged) {
      // need to return if no actions were added or removed.
      // otherwise we will get an infinite loop, when `runtimeActionsList`
      // is computed during rendering and it updates the MobX store that
      // causes another render and so on.
      return [...this.runtimeActions.values()]
    }

    this.runtimeActions.clear()

    storeActions.forEach((action) => {
      const runtimeAction = RuntimeActionModel.create({
        action: actionRef(action),
        id: v4(),
        runtimeStore: runtimeStoreRef(this.id),
      })

      this.runtimeActions.set(runtimeAction.id, runtimeAction)
    })

    return [...this.runtimeActions.values()]
  }
}
