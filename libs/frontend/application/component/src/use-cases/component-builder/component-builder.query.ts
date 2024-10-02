import type {
  IComponentBuilderArgs,
  IComponentBuilderQuery,
} from '@codelab/frontend/abstract/domain'
import type {
  AtomBuilderFragment,
  GetComponentBuilderQuery,
} from '@codelab/shared/infra/gql'

import { GetComponentBuilder } from '@codelab/frontend-domain-component/repositories'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { uniqueBy } from 'remeda'

export const componentBuilderQuery: IComponentBuilderQuery = async ({
  componentId,
}: IComponentBuilderArgs) => {
  const data: GetComponentBuilderQuery = await GetComponentBuilder({})
  const components = data.components

  const currentComponent = components.find(
    (component) => component.id === componentId,
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

  const atoms = uniqueBy(
    [
      ...elements
        .flatMap((element) => element.renderType)
        .filter(
          (item): item is AtomBuilderFragment => item.__typename === 'Atom',
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
