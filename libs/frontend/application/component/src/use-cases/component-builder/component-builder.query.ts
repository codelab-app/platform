import type {
  IComponentBuilderArgs,
  IComponentBuilderQuery,
} from '@codelab/frontend/abstract/domain'
import type { AtomBuilderFragment } from '@codelab/shared/infra/gqlgen'

import { GetComponentBuilder } from '@codelab/frontend-domain-component/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { uniqueBy } from 'remeda'

export const componentBuilderQuery: IComponentBuilderQuery = async ({
  componentId,
}: IComponentBuilderArgs) => {
  const data = await GetComponentBuilder(
    {
      componentId,
    },
    {
      // Include all the cache tags that are used in the component builder
      tags: [
        CACHE_TAGS.Component.builder(),
        CACHE_TAGS.Action.list(),
        CACHE_TAGS.Atom.list(),
        CACHE_TAGS.Component.list(),
        CACHE_TAGS.Element.list(),
        CACHE_TAGS.Field.list(),
        CACHE_TAGS.Prop.list(),
        CACHE_TAGS.Resource.list(),
        CACHE_TAGS.Store.list(),
        CACHE_TAGS.Tag.list(),
        CACHE_TAGS.Type.list(),
      ],
    },
  )

  console.log('data', data)
  console.log('componentId', componentId)

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

  const componentsDependantTypes = components.flatMap(
    (component) => component.dependantTypes,
  )

  const types = [
    ...atoms.flatMap((type) => type.api),
    ...stores.map((store) => store.api),
    ...components.map((component) => component.api),
    ...componentsDependantTypes.filter(
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
  const tags = atoms.flatMap((atom) => atom.tags)

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
    tags,
    types: [...types, ...componentsDependantTypes, ...systemTypes],
  }
}
