'use server'

import { componentDevelopmentRepository } from '@codelab/frontend-domain-component/repositories'
import type { AtomDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import uniqBy from 'lodash/uniqBy'

export const componentDevelopmentUseCase = async (componentName: string) => {
  const data = await componentDevelopmentRepository()
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
          (item): item is AtomDevelopmentFragment => item.__typename === 'Atom',
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

  const fields = types.flatMap((type) => ('fields' in type ? type.fields : []))

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
}
