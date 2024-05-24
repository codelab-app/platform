import type {
  IComponentModel,
  IElementModel,
  IInterfaceTypeModel,
  IPropModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  elementRef,
  ElementTree,
  getUserDomainService,
  isComponent,
  storeRef,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { Prop } from '@codelab/frontend-domain-prop'
import type { ComponentUpdateInput } from '@codelab/shared/abstract/codegen'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import type { IComponentDto, IRef } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { connectNodeId, connectOwner } from '@codelab/shared/domain'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  api,
  id,
  name,
  props,
  rootElement,
  store,
}: IComponentDto) => {
  return new Component({
    api: typeRef<IInterfaceTypeModel>(api.id),
    id,
    instanceElement: null,
    name,
    props: Prop.create(props),
    rootElement: elementRef(rootElement.id),
    store: storeRef(store.id),
  })
}

@model('@codelab/Component')
export class Component
  extends ExtendedModel(ElementTree, {
    api: prop<Ref<IInterfaceTypeModel>>(),
    // element which this component is attached to.
    instanceElement: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    name: prop<string>().withSetter(),
    props: prop<IPropModel>().withSetter(),
    // if this is a duplicate, trace source component id else null
    sourceComponent: prop<Nullable<IRef>>(null).withSetter(),
    store: prop<Ref<IStoreModel>>().withSetter(),
  })
  implements IComponentModel
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static create = create

  @computed
  get __typename() {
    return IElementRenderTypeKind.Component as const
  }

  /**
   * Finds all the components that are referenced by all the
   * children of this component as well as the children of
   * any of these found components recursively
   */
  @computed
  get descendantComponents() {
    const descendants = new Set<IComponentModel>()

    this.elements.forEach((element) => {
      if (isComponent(element.renderType.current)) {
        const component = element.renderType.current

        // Add the component as it was referenced by this element
        descendants.add(component)

        // Now start at this component and get its descendants
        component.descendantComponents.forEach((descendantComponent) => {
          descendants.add(descendantComponent)
        })
      }
    })

    return Array.from(descendants)
  }

  @computed
  get toJson() {
    return {
      __typename: this.__typename,
      api: this.api,
      id: this.id,
      name: this.name,
      props: this.props.toJson,
      rootElement: this.rootElement,
      store: this.store,
    }
  }

  @modelAction
  toCreateInput(): ComponentCreateInput {
    return {
      api: { create: { node: this.api.current.toCreateInput() } },
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userDomainService.user),
      props: { create: { node: this.props.toCreateInput() } },
      rootElement: connectNodeId(this.rootElement.id),
      store: { create: { node: this.store.current.toCreateInput() } },
    }
  }

  @modelAction
  writeCache({ api, name, props, rootElement }: Partial<IComponentDto>) {
    const apiRef = api?.id ? typeRef<IInterfaceTypeModel>(api.id) : this.api

    this.name = name ?? this.name
    this.rootElement = rootElement?.id
      ? elementRef(rootElement.id)
      : this.rootElement
    this.api = apiRef
    this.props = props ? Prop.create(props) : this.props

    return this
  }

  toUpdateInput(): ComponentUpdateInput {
    return {}
  }

  @computed
  private get userDomainService() {
    return getUserDomainService(this)
  }
}
