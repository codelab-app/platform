import type {
  IComponentModel,
  IInterfaceTypeModel,
  IPageModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import type { IStoreDto } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import {
  componentRef,
  getActionDomainService,
  pageRef,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { createStoreName } from '@codelab/shared/domain'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ api, component, id, name, page }: IStoreDto): IStoreModel =>
  new Store({
    api: typeRef(api.id) as Ref<IInterfaceTypeModel>,
    component: component?.id ? componentRef(component.id) : null,
    id,
    name,
    page: page?.id ? pageRef(page.id) : null,
  })

@model('@codelab/Store')
export class Store
  extends Model(() => ({
    api: prop<Ref<IInterfaceTypeModel>>(),
    component: prop<Nullable<Ref<IComponentModel>>>().withSetter(),
    id: idProp,
    name: prop<string>(),
    page: prop<Nullable<Ref<IPageModel>>>(),
  }))
  implements IStoreModel
{
  static create = create

  static createName = createStoreName

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
  get actions() {
    return this.actionsDomainService.actionsList.filter(
      (action) => action.store.id === this.id,
    )
  }

  @computed
  get actionsDomainService() {
    return getActionDomainService(this)
  }

  @computed
  get actionsTree() {
    return this.actions
      .map((action) => ({
        extraData: {
          node: action,
          type: 'action' as const,
        },
        isLeaf: true,
        key: action.id,
        primaryTitle: action.name,
        secondaryTitle: action.type,
        selectable: true,
        title: `${action.name} (${action.type})`,
      }))
      .filter((node) => Boolean(node))
  }

  @computed
  get toJson() {
    return {
      actions: this.actions.map((action) => action.toJson),
      api: { ...this.api, __typename: ITypeKind.InterfaceType as const },
      component: this.component,
      id: this.id,
      name: this.name,
      page: this.page,
    }
  }

  @modelAction
  writeCache({ api, id, name }: Partial<IStoreDto>) {
    this.id = id ? id : this.id
    this.name = name ? name : this.name
    this.api = api ? (typeRef(api.id) as Ref<IInterfaceTypeModel>) : this.api

    return this
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
}
