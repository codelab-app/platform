import type {
  IAppDTO,
  IComponent,
  IInterfaceType,
  IPage,
  IStore,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  IPropData,
  pageRef,
} from '@codelab/frontend/abstract/core'
import { typeRef } from '@codelab/frontend/domain/type'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { computed, makeAutoObservable } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getActionService } from '../action.service.context'
import { getStoreService } from '../store.service.context'

const create = ({ api, component, id, name, page }: IStoreDTO) => {
  new Store({
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
    _initialState: prop<IPropData>(() => ({})),
    api: prop<Ref<IInterfaceType>>().withSetter(),
    component: prop<Nullable<Ref<IComponent>>>().withSetter(),
    id: idProp,
    name: prop<string>(),
    page: prop<Nullable<Ref<IPage>>>(),
    // if this is a duplicate, trace source component id else null
    sourceStore: prop<Nullable<IEntity>>(null).withSetter(),
  }))
  implements IStore
{
  @computed
  get storeService() {
    return getStoreService(this)
  }

  @modelAction
  setInitialState(state: IPropData) {
    this._initialState = state
  }

  @modelAction
  writeCache({ api, id, name }: Partial<IStoreDTO>) {
    this.id = id ? id : this.id
    this.name = name ? name : this.name
    this.api = api ? (typeRef(api.id) as Ref<IInterfaceType>) : this.api

    return this
  }

  @computed
  get jsonString() {
    return JSON.stringify(this.state)
  }

  @computed
  get actionService() {
    return getActionService(this)
  }

  @computed
  get actions() {
    return this.actionService.actionsList.filter(
      ({ store: { id } }) => this.id === id || this.sourceStore?.id === id,
    )
  }

  @computed
  get state() {
    return makeAutoObservable(
      mergeProps(
        this.api.current.defaultValues,
        this.component?.current.initialState,
        this._initialState,
        this.actions
          .map((action) => ({ [action.name]: action.createRunner() }))
          .reduce(merge, {}),
      ),
      {},
      // bind actions to state
      { autoBind: true },
    )
  }

  @modelAction
  clone() {
    return this.storeService.add({
      api: typeRef<IInterfaceType>(this.api.id),
      id: v4(),
      name: this.name,
      sourceStore: { id: this.id },
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
