import type {
  IAction,
  IComponent,
  IInterfaceType,
  IPage,
  IPropData,
  IStore,
} from '@codelab/frontend/abstract/core'
import {
  actionRef,
  componentRef,
  getRenderService,
  getRunnerId,
  isAtomInstance,
  pageRef,
  typeRef,
} from '@codelab/frontend/abstract/core'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO, IStoreDTO } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { propSafeStringify } from '@codelab/shared/utils'
import keys from 'lodash/keys'
import merge from 'lodash/merge'
import { autorun, computed, observable, set } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getStoreService } from '../store.service.context'

const create = ({
  actions = [],
  api,
  component,
  id,
  name,
  page,
}: IStoreDTO): IStore =>
  new Store({
    actions: actions.map((action) => actionRef(action.id)),
    api: typeRef(api.id) as Ref<IInterfaceType>,
    component: component?.id ? componentRef(component.id) : null,
    id,
    name,
    page: page?.id ? pageRef(page.id) : null,
  })

const createName = (app: Pick<IAppDTO, 'name'>) => {
  return `${app.name} Store`
}

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    actions: prop<Array<Ref<IAction>>>(),
    api: prop<Ref<IInterfaceType>>(),
    component: prop<Nullable<Ref<IComponent>>>().withSetter(),
    id: idProp,
    name: prop<string>(),
    page: prop<Nullable<Ref<IPage>>>(),
    // if this is a duplicate, source store id else null
    source: prop<Nullable<Ref<IStore>>>(null).withSetter(),
  }))
  implements IStore
{
  refs = observable.object<IPropData>({})

  onAttachedToRootStore() {
    this.createEmptyRefs(this.refKeys)
    autorun(() => this.deleteUnusedRefs())
  }

  @computed
  get actionsTree() {
    return this.actions
      .map((action) => ({
        extraData: {
          node: action.current,
          type: 'action' as const,
        },
        isLeaf: true,
        key: action.id,
        primaryTitle: action.current.name,
        secondaryTitle: action.current.type,
        selectable: true,
        title: `${action.current.name} (${action.current.type})`,
      }))
      .filter((node) => Boolean(node))
  }

  @computed
  get storeService() {
    return getStoreService(this)
  }

  @computed
  get refKeys(): Array<string> {
    const elementTree = this.page?.current || this.component?.current
    const elements = elementTree?.elements || []

    return elements
      .filter((element) => isAtomInstance(element.renderType))
      .map(({ slug }) => slug)
  }

  @computed
  get jsonString() {
    return propSafeStringify({
      refs: this.refs,
      state: this.state,
    })
  }

  @computed
  get renderService() {
    return getRenderService(this)
  }

  private cachedState: Nullable<object> = null

  @computed
  get actionRunners() {
    const renderer = this.renderService.activeRenderer?.current

    const actionRunners = this.actions
      .map(({ current: action }) => {
        const actionId = getRunnerId(this.id, action.id)
        const actionRunner = renderer?.actionRunners.get(actionId)
        const fallback = () => console.error(`fail to call ${action.name}`)
        const runner = actionRunner?.runner || fallback

        return { [action.name]: runner }
      })
      .reduce(merge, {})

    Object.keys(actionRunners).forEach((actionName) => {
      actionRunners[actionName] = actionRunners[actionName].bind({
        actions: actionRunners,
        state: this.cachedState,
      })
    })

    return actionRunners
  }

  @computed
  get state() {
    if (this.cachedState) {
      return this.cachedState
    }

    this.cachedState = observable(this.api.maybeCurrent?.defaultValues ?? {})

    return this.cachedState
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

  @modelAction
  writeCache({ actions, api, id, name }: Partial<IStoreDTO>) {
    this.id = id ? id : this.id
    this.name = name ? name : this.name
    this.api = api ? (typeRef(api.id) as Ref<IInterfaceType>) : this.api
    this.actions =
      actions?.map((action) => actionRef(action.id)) ?? this.actions

    return this
  }

  registerRef(key: string, current: Nullable<HTMLElement>) {
    set(this.refs, { [key]: { current } })
  }

  @modelAction
  clone(componentId: string) {
    const id = v4()

    return this.storeService.add({
      actions: [...this.actions.values()].map((action) => ({
        id: action.current.id,
      })),
      api: typeRef<IInterfaceType>(this.api.id),
      component: componentRef(componentId),
      id,
      name: this.name,
      source: { id: this.id },
    })
  }

  static create = create

  toCreateInput(): StoreCreateInput {
    const api = this.api.current

    return {
      api: { create: { node: api.toCreateInput() } },
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
