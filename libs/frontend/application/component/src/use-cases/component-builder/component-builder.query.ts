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
        CACHE_TAGS.ComponentBuilder(),
        CACHE_TAGS.ActionList(),
        CACHE_TAGS.AtomList(),
        CACHE_TAGS.ComponentsList(),
        CACHE_TAGS.ElementList(),
        CACHE_TAGS.FieldList(),
        CACHE_TAGS.PropList(),
        CACHE_TAGS.ResourceList(),
        CACHE_TAGS.StoreList(),
        CACHE_TAGS.TagList(),
        CACHE_TAGS.TypeList(),
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
