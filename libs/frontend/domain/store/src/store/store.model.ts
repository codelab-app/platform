import { getRendererService } from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IComponentModel,
  IInterfaceTypeModel,
  IPageModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  actionRef,
  componentRef,
  getRendererDomainService,
  getRunnerId,
  isAtomRef,
  pageRef,
  RendererType,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { propSafeStringify } from '@codelab/frontend/domain/prop'
import { InterfaceType } from '@codelab/frontend/domain/type'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IAction,
  IAppDTO,
  IPropData,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import keys from 'lodash/keys'
import merge from 'lodash/merge'
import { autorun, computed, observable, set } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getStoreDomainService } from '../services/store.domain.service.context'

const create = ({
  actions = [],
  api,
  component,
  id,
  name,
  page,
}: IStoreDTO): IStoreModel =>
  new Store({
    actions: actions.map((action) => actionRef(action.id)),
    api: typeRef(api.id) as Ref<IInterfaceTypeModel>,
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
    actions: prop<Array<Ref<IActionModel>>>(),
    api: prop<Ref<IInterfaceTypeModel>>(),
    component: prop<Nullable<Ref<IComponentModel>>>().withSetter(),
    id: idProp,
    name: prop<string>(),
    page: prop<Nullable<Ref<IPageModel>>>(),
    // if this is a duplicate, source store id else null
    source: prop<Nullable<Ref<IStoreModel>>>(null).withSetter(),
  }))
  implements IStoreModel
{
  static create = create

  static createName = createName

  static toDeleteInput(): StoreDeleteInput {
    return {
      actions: {
        ApiAction: [{ where: {} }],
        CodeAction: [{ where: {} }],
      },
      api: { delete: InterfaceType.toDeleteInput(), where: {} },
    }
  }

  @computed
  get toJson() {
    return {
      actions: this.actions.map((action) => action.current as IAction),
      api: { ...this.api, __typename: `${ITypeKind.InterfaceType}` as const },
      component: this.component,
      id: this.id,
      name: this.name,
      page: this.page,
      source: this.source,
    }
  }

  @computed
  get actionRunners() {
    const renderer = this.rendererService.activeRenderer?.current

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
        state: this.state,
      })
    })

    return actionRunners
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
  get jsonString() {
    return propSafeStringify({
      refs: this.refs,
      state: this.state,
    })
  }

  @computed
  get refKeys(): Array<string> {
    const elementTree = this.page?.current || this.component?.current
    const elements = elementTree?.elements || []

    return elements
      .filter((element) => isAtomRef(element.renderType))
      .map(({ slug }) => slug)
  }

  @computed
  get state() {
    const { rendererType } = this.rendererService.activeRenderer?.current ?? {}

    const isPreviewOrProduction =
      rendererType === RendererType.Preview ||
      rendererType === RendererType.Production

    if (isPreviewOrProduction && this.cachedState) {
      return this.cachedState
    }

    this.cachedState = observable(this.api.maybeCurrent?.defaultValues ?? {})

    return this.cachedState
  }

  refs = observable.object<IPropData>({})

  @modelAction
  clone(componentId: string) {
    const id = v4()

    return this.storeDomainService.hydrate({
      actions: [...this.actions.values()].map(
        (action) => action.current.toJson,
      ),
      api: typeRef<IInterfaceTypeModel>(this.api.id),
      component: componentRef(componentId),
      id,
      name: this.name,
      source: { id: this.id },
    })
  }

  @modelAction
  writeCache({ actions, api, id, name }: Partial<IStoreDTO>) {
    this.id = id ? id : this.id
    this.name = name ? name : this.name
    this.api = api ? (typeRef(api.id) as Ref<IInterfaceTypeModel>) : this.api
    this.actions =
      actions?.map((action) => actionRef(action.id)) ?? this.actions

    return this
  }

  createEmptyRefs(refKeys: Array<string>) {
    refKeys.forEach((key: string) => {
      this.registerRef(key, null)
    })
  }

  deleteUnusedRefs() {
    keys(this.refs).forEach((key) => {
      if (!this.refKeys.includes(key)) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.refs[key]
      }
    })
  }

  onAttachedToRootStore() {
    this.createEmptyRefs(this.refKeys)
    autorun(() => this.deleteUnusedRefs())
  }

  registerRef(key: string, current: Nullable<HTMLElement>) {
    set(this.refs, { [key]: { current } })
  }

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

  private cachedState: Nullable<object> = null

  @computed
  private get rendererService() {
    return getRendererService(this)
  }

  @computed
  private get storeDomainService() {
    return getStoreDomainService(this)
  }
}
