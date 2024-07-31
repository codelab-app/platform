import type {
  IComponentDevelopmentArgs,
  IComponentDevelopmentDto,
  IComponentDevelopmentService,
} from '@codelab/frontend/abstract/domain'
import type {
  AtomDevelopmentFragment,
  GetComponentDevelopmentQuery,
} from '@codelab/frontend/infra/gql'
import { componentDevelopmentApi } from '@codelab/frontend-domain-component/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import uniqBy from 'lodash/uniqBy'
import { useCallback } from 'react'

export const useComponentDevelopmentService =
  (): IComponentDevelopmentService => {
    const {
      actionDomainService,
      atomDomainService,
      componentDomainService,
      elementDomainService,
      fieldDomainService,
      resourceDomainService,
      storeDomainService,
      typeDomainService,
    } = useDomainStore()

    const getComponentDevelopmentData = useCallback(
      async ({ componentName }: IComponentDevelopmentArgs) => {
        const data: GetComponentDevelopmentQuery =
          await componentDevelopmentApi.GetComponentDevelopment({})

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
            ...elements
              .flatMap((element) => element.renderType)
              .filter(
                (item): item is AtomDevelopmentFragment =>
                  item.__typename === 'Atom',
              ),
            ...data.atoms,
          ],
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
      },
      [],
    )

    const hydrateComponentDevelopmentData = useCallback(
      (data: IComponentDevelopmentDto) => {
        data.atoms.forEach((atom) => atomDomainService.hydrate(atom))
        data.types.forEach((type) => typeDomainService.hydrate(type))
        data.fields.forEach((field) => fieldDomainService.hydrate(field))
        data.elements.forEach((element) =>
          elementDomainService.hydrate(element),
        )
        data.components.forEach((component) =>
          componentDomainService.hydrate(component),
        )
        data.stores.forEach((store) => storeDomainService.hydrate(store))
        data.actions.forEach((action) => actionDomainService.hydrate(action))
        data.resources.forEach((resource) =>
          resourceDomainService.hydrate(resource),
        )

        return componentDomainService.component(data.component.id)
      },
      [
        atomDomainService,
        typeDomainService,
        fieldDomainService,
        elementDomainService,
        componentDomainService,
        storeDomainService,
        actionDomainService,
        resourceDomainService,
      ],
    )

    return {
      getComponentDevelopmentData,
      hydrateComponentDevelopmentData,
    }
  }
