import type {
  IComponentDevelopmentArgs,
  IComponentDevelopmentService,
} from '@codelab/frontend/abstract/domain'
import {
  getActionDomainService,
  getAtomDomainService,
  getComponentDomainService,
  getElementDomainService,
  getFieldDomainService,
  getResourceDomainService,
  getStoreDomainService,
  IComponentDevelopmentDto,
} from '@codelab/frontend/abstract/domain'
import { getTypeDomainService } from '@codelab/frontend-domain-type/services'
import type {
  AtomDevelopmentFragment,
  GetComponentDevelopmentQuery,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import uniqBy from 'lodash/uniqBy'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
} from 'mobx-keystone'
import { componentDevelopmentApi } from './component-development.api'

@model('@codelab/ComponentDevelopmentService')
export class ComponentDevelopmentService
  extends Model({})
  implements IComponentDevelopmentService
{
  @modelFlow
  getComponentDevelopmentData = _async(function* (
    this: ComponentDevelopmentService,
    { componentName }: IComponentDevelopmentArgs,
  ) {
    const data: GetComponentDevelopmentQuery = yield* _await(
      componentDevelopmentApi.GetComponentDevelopment(),
    )

    const components = data.components

    const currentComponent = components.find(
      (component) => component.name === componentName,
    )

    if (!currentComponent) {
      throw new Error('Missing component')
    }

    const elements = components.flatMap((component) =>
      component.elements.map((element) => ({
        ...element,
        closestContainerNode: { id: component.id },
        component: { id: component.id },
      })),
    )

    const resources = data.resources

    const props = elements
      .flatMap((element) => element.props)
      .concat(resources.map((resource) => resource.config))

    const stores = components.map((component) => ({
      ...component.store,
      component: { id: component.id },
    }))

    const actions = stores.flatMap((store) => store.actions)

    const atoms = uniqBy(
      [
        // Load all the atoms used by elements
        ...elements
          .flatMap((element) => element.renderType)
          .filter(
            (item): item is AtomDevelopmentFragment =>
              item.__typename === 'Atom',
          ),
        // Also load the default atoms, here is just type `ReactFragment`
        ...data.atoms,
      ],
      // Filter by id in case `ReactFragment` already exists
      (atom) => atom.id,
    )

    const elementsDependantTypes = elements
      .map((element) => element.dependantTypes)
      .flat()

    const types = [
      ...atoms.flatMap((type) => type.api),
      ...stores.map((store) => store.api),
      ...components.map((component) => component.api),
      ...elementsDependantTypes.filter(
        (type) => type.kind === ITypeKind.InterfaceType,
      ),
    ]

    const systemTypes = [
      ...data.codeMirrorTypes,
      ...data.primitiveTypes,
      ...data.reactNodeTypes,
      ...data.richTextTypes,
      ...data.renderPropTypes,
      ...data.actionTypes,
    ]

    const fields = types.flatMap((type) =>
      'fields' in type ? type.fields : [],
    )

    return {
      actions,
      atoms,
      component: currentComponent,
      components,
      elements,
      fields,
      props,
      resources: data.resources,
      stores,
      types: [...types, ...elementsDependantTypes, ...systemTypes],
    }
  })

  @modelAction
  hydrateComponentDevelopmentData(data: IComponentDevelopmentDto) {
    data.atoms.forEach((atom) => this.atomDomainService.hydrate(atom))

    data.types.forEach((type) => this.typeDomainService.hydrate(type))

    data.fields.forEach((field) => this.fieldDomainService.hydrate(field))

    data.elements.forEach((element) =>
      this.elementDomainService.hydrate(element),
    )

    data.components.forEach((component) =>
      this.componentDomainService.hydrate(component),
    )

    data.stores.forEach((store) => this.storeDomainService.hydrate(store))

    data.actions.forEach((action) => this.actionDomainService.hydrate(action))

    data.resources.forEach((resource) =>
      this.resourceDomainService.hydrate(resource),
    )

    return this.componentDomainService.component(data.component.id)
  }

  @computed
  private get actionDomainService() {
    return getActionDomainService(this)
  }

  @computed
  private get atomDomainService() {
    return getAtomDomainService(this)
  }

  @computed
  private get componentDomainService() {
    return getComponentDomainService(this)
  }

  @computed
  private get elementDomainService() {
    return getElementDomainService(this)
  }

  @computed
  private get fieldDomainService() {
    return getFieldDomainService(this)
  }

  @computed
  private get resourceDomainService() {
    return getResourceDomainService(this)
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
