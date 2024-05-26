import type {
  IComponentDomainService,
  IComponentModel,
  IElementModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import {
  getAtomDomainService,
  getElementDomainService,
  getStoreDomainService,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { Store } from '@codelab/frontend-domain-store/store'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import { getTypeDomainService } from '@codelab/frontend-domain-type/services'
import type { IPropDto } from '@codelab/shared/abstract/core'
import {
  IComponentDto,
  ICreateComponentData,
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import sortBy from 'lodash/sortBy'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { Component } from '../store'

@model('@codelab/ComponentDomainService')
export class ComponentDomainService
  extends Model({
    components: prop(() => objectMap<IComponentModel>()),
  })
  implements IComponentDomainService
{
  @computed
  get componentList() {
    return [...this.components.values()]
  }

  @computed
  get sortedComponentsList() {
    return sortBy(this.componentList, 'name')
  }

  @modelAction
  add({ id, name, rootElement }: ICreateComponentData) {
    const storeApi = this.typeDomainService.hydrateInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${name} Store`),
    })

    const store = this.storeDomainService.hydrate({
      api: typeRef<IInterfaceTypeModel>(storeApi.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const fragmentAtom = this.atomDomainService.defaultRenderType

    this.atomDomainService.hydrate(fragmentAtom)

    const api = this.typeDomainService.hydrateInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(name),
    })

    const componentProps: IPropDto = {
      data: '{}',
      id: v4(),
    }

    /**
     * create rootElement in case it doesn't already exist
     * Unlike other models such rootElement could exist before component (convertElementToComponent)
     * connectOrCreate can't handle sub-models like props for element
     * the only choice left is to create rootElement here if it is not provided
     * */
    const rootElementModel: IElementModel = rootElement
      ? this.elementDomainService.element(rootElement.id)
      : this.elementDomainService.hydrate({
          // Doesn't seem needed in hydrate
          // closestContainerNode: {
          //   id,
          // },
          id: v4(),
          // we don't append 'Root' here to include the case of existing element
          name,
          parentComponent: { id },
          props: {
            data: '{}',
            id: v4(),
          },
          renderType: {
            __typename: IElementRenderTypeKind.Atom,
            id: fragmentAtom.id,
          },
        })

    rootElementModel.writeCache({ name: `${name} Root` })

    const component = this.hydrate({
      api,
      id,
      name,
      props: componentProps,
      rootElement: rootElementModel,
      store,
    })

    return component
  }

  @modelAction
  component(id: string) {
    const component = this.maybeComponent(id)

    if (!component) {
      throw new Error('Missing component')
    }

    return component
  }

  @modelAction
  hydrate(componentDto: IComponentDto) {
    let component = this.components.get(componentDto.id)

    if (component) {
      component.writeCache(componentDto)
    } else {
      component = Component.create(componentDto)

      this.components.set(component.id, component)
    }

    return component
  }

  @modelAction
  maybeComponent(id: string) {
    return this.components.get(id)
  }

  @computed
  private get atomDomainService() {
    return getAtomDomainService(this)
  }

  @computed
  private get elementDomainService() {
    return getElementDomainService(this)
  }

  @computed
  private get storeDomainService() {
    return getStoreDomainService(this)
  }

  @computed
  private get typeDomainService() {
    return getTypeDomainService(this)
  }
}
