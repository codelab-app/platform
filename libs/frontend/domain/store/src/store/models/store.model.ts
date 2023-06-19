import type {
  IAction,
  IComponent,
  IInterfaceType,
  IPage,
  IStore,
} from '@codelab/frontend/abstract/core'
import {
  actionRef,
  componentRef,
  getRenderService,
  getRunnerId,
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
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { computed, makeAutoObservable } from 'mobx'
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
}: IStoreDTO) => {
  new Store({
    actions: actions.map((action) => actionRef(action.id)),
    api: typeRef(api.id) as Ref<IInterfaceType>,
    component: component?.id ? componentRef(component.id) : null,
    id,
    name,
    page: page?.id ? pageRef(page.id) : null,
  })
}

const createName = (app: Pick<IAppDTO, 'name'>) => {
  return `${app.name} Store`
}

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    actions: prop<Array<Ref<IAction>>>(),
    api: prop<Ref<IInterfaceType>>().withSetter(),
    component: prop<Nullable<Ref<IComponent>>>().withSetter(),
    id: idProp,
    name: prop<string>(),

    page: prop<Nullable<Ref<IPage>>>(),
    // if this is a duplicate, source store id else null
    source: prop<Nullable<Ref<IStore>>>(null).withSetter(),
  }))
  implements IStore
{
  @computed
  get actionsTree() {
    return this.actions
      .map((action) => ({
        isLeaf: true,
        key: action.id,
        node: action.current,
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
  get jsonString() {
    return propSafeStringify(this.state)
  }

  @computed
  get renderService() {
    return getRenderService(this)
  }

  @computed
  get state() {
    const renderer = this.renderService.activeRenderer?.current

    return makeAutoObservable(
      mergeProps(
        this.api.current.defaultValues,
        this.actions
          .map(({ current: action }) => {
            const actionId = getRunnerId(this.id, action.id)
            const actionRunner = renderer?.actionRunners.get(actionId)
            const fallback = () => console.error(`fail to call ${action.name}`)
            const runner = actionRunner?.runner || fallback

            return { [action.name]: runner }
          })
          .reduce(merge, {}),
      ),
      {},
      // bind actions to state
      { autoBind: true },
    )
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
      api: {
        create: {
          node: api.toCreateInput(),
        },
      },
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
