import type {
  IRuntimeAction,
  IRuntimeElementDto,
  IRuntimeElementModel,
  IRuntimeStore,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  RendererType,
  runtimeElementRef,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IApiActionModel,
  IBaseResourceConfigData,
  ICodeActionModel,
  IElementModel,
  IGraphQLActionConfig,
  IRestActionConfig,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  actionRef,
  elementRef,
  IPropModel,
  isAtomRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import { propSafeStringify } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { IActionKind, IResourceType } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { throwIfUndefined } from '@codelab/shared/utils'
import { runtime } from '@ts-morph/common'
import type { Axios, Method } from 'axios'
import axios from 'axios'
import type { GraphQLClient } from 'graphql-request'
import isNil from 'lodash/isNil'
import isString from 'lodash/isString'
import keys from 'lodash/keys'
import merge from 'lodash/merge'
import { autorun, computed, observable, set } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { RuntimeAction } from './runtime-action.model'

const create = (runtimeElement: IRuntimeElementDto) => {
  const { element } = runtimeElement
  const store = element.store.current

  return new RuntimeStore({
    runtimeActions: store.actions.map((action) =>
      RuntimeAction.create(action.current, store),
    ),
    runtimeElementRef: runtimeElementRef(runtimeElement.id),
    storeRef: storeRef(store.id),
  })
}

@model('@codelab/RuntimeStore')
export class RuntimeStore
  extends Model(() => ({
    runtimeActions: prop<Array<IRuntimeAction>>(() => []),
    runtimeElementRef: prop<Ref<IRuntimeElementModel>>(),
    storeRef: prop<Ref<IStoreModel>>(),
  }))
  implements IRuntimeStore
{
  static create = create

  private cachedState: Nullable<object> = null

  @computed
  get runtimeElement() {
    return this.runtimeElementRef.current
  }

  @computed
  get store() {
    return this.storeRef.current
  }

  @computed
  get renderer() {
    const renderService = getRendererService(this)

    return renderService.activeRenderer?.current
  }

  runtimeAction(action: IActionModel) {
    return throwIfUndefined(
      this.runtimeActions.find(
        (runtimeAction) => runtimeAction.id === action.id,
      ),
    )
  }

  @computed
  get state() {
    const { rendererType } = this.renderer ?? {}

    const isPreviewOrProduction =
      rendererType === RendererType.Preview ||
      rendererType === RendererType.Production

    if (isPreviewOrProduction && this.cachedState) {
      return this.cachedState
    }

    this.cachedState = observable(
      this.store.api.maybeCurrent?.defaultValues ?? {},
    )

    return this.cachedState
  }

  refs = observable.object<IPropData>({})

  @computed
  get jsonString() {
    return propSafeStringify({
      refs: this.refs,
      state: this.state,
    })
  }

  registerRef(key: string, current: Nullable<HTMLElement>) {
    set(this.refs, { [key]: { current } })
  }

  @computed
  get refKeys(): Array<string> {
    const elementTree =
      this.store.page?.current || this.store.component?.current

    const elements = elementTree?.elements || []

    return elements
      .filter((element) => isAtomRef(element.renderType))
      .map(({ slug }) => slug)
  }

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

  onAttachedToRootStore() {
    this.createEmptyRefs(this.refKeys)
    autorun(() => this.deleteUnusedRefs())
  }
}
