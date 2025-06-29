import type {
  IComponentModel,
  IElementModel,
  IInterfaceTypeModel,
  IPropModel,
  IStoreModel,
  IUserModel,
} from '@codelab/frontend-abstract-domain'
import type { IComponentDto, IRef } from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import {
  elementRef,
  ElementTree,
  isComponent,
  storeRef,
  typeRef,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { Prop } from '@codelab/frontend-domain-prop/store'
import { toRefSchema } from '@codelab/frontend-shared-utils'
import { IElementRenderTypeKind } from '@codelab/shared-abstract-core'
import { slugify } from '@codelab/shared-utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  api,
  id,
  name,
  owner,
  props,
  rootElement,
  store,
}: IComponentDto) => {
  return new Component({
    api: typeRef<IInterfaceTypeModel>(api.id),
    id,
    instanceElement: null,
    name,
    owner: userRef(owner.id),
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
    owner: prop<Ref<IUserModel>>(),
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
  get slug() {
    return slugify(this.name)
  }

  @computed
  get toJson() {
    return {
      __typename: this.__typename,
      api: toRefSchema(this.api),
      id: this.id,
      name: this.name,
      owner: toRefSchema(this.owner),
      props: this.props.toJson,
      rootElement: toRefSchema(this.rootElement),
      slug: this.slug,
      store: toRefSchema(this.store),
    }
  }

  @modelAction
  writeCache({ api, name, props, rootElement, store }: Partial<IComponentDto>) {
    const apiRef = api?.id ? typeRef<IInterfaceTypeModel>(api.id) : this.api

    this.name = name ?? this.name
    this.rootElement = rootElement?.id
      ? elementRef(rootElement.id)
      : this.rootElement
    this.api = apiRef
    this.props = props ? Prop.create(props) : this.props

    return this
  }
}
