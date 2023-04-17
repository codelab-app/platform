import type {
  IAction,
  IAppDTO,
  IComponent,
  IInterfaceType,
  IPage,
  IProp,
  IStore,
} from '@codelab/frontend/abstract/core'
import { componentRef, pageRef } from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { typeRef } from '@codelab/frontend/domain/type'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { Nullable } from '@codelab/shared/abstract/types'
import merge from 'lodash/merge'
import { computed, makeAutoObservable } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getStoreService } from '../store.service.context'
import { actionRef } from './action.ref'

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
    actions: prop<Array<Ref<IAction>>>(() => []),
    api: prop<Ref<IInterfaceType>>().withSetter(),
    component: prop<Nullable<Ref<IComponent>>>().withSetter(),
    id: idProp,
    initialState: prop<IProp>(() => new Prop({})),
    name: prop<string>(),
    page: prop<Nullable<Ref<IPage>>>(),
  }))
  implements IStore
{
  @computed
  get storeService() {
    return getStoreService(this)
  }

  @modelAction
  writeCache({ actions, api, id, name }: Partial<IStoreDTO>) {
    this.id = id ? id : this.id
    this.name = name ? name : this.name
    this.api = api ? (typeRef(api.id) as Ref<IInterfaceType>) : this.api
    this.actions = actions
      ? actions.map((action) => actionRef(action.id))
      : this.actions

    return this
  }

  @computed
  get jsonString() {
    return JSON.stringify(this.state)
  }

  @computed
  get state() {
    return makeAutoObservable(
      merge(
        { ...this.initialState.values },
        { ...this.api.current.defaultValues },
        { ...this.component?.current.api.current.defaultValues },
        { ...this.component?.current.props.current.values },
        {
          ...this.component?.current.instanceElement?.current.props.current
            .values,
        },
        {
          ...this.actions
            .map((action) => ({
              [action.current.name]: action.current.createRunner(),
            }))
            .reduce(merge, {}),
        },
      ),
      {},
      // bind actions to state
      { autoBind: true },
    )
  }

  @modelAction
  clone() {
    return this.storeService.add({
      actions: this.actions,
      api: typeRef<IInterfaceType>(this.api.id),
      id: v4(),
      initialState: this.initialState.clone(),
      name: this.name,
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
