import type { IAppBuilderQuery } from '@codelab/frontend/abstract/domain'
import type { AtomBuilderFragment } from '@codelab/shared/infra/gql'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { uniqueBy } from 'remeda'

import { GetAppBuilder } from './app-builder.api.graphql.web.gen'

export const appBuilderQuery: IAppBuilderQuery = async ({
  appId,
}: {
  appId: string
}) => {
  const data = await GetAppBuilder({
    appId,
  })

  const app = data.apps[0]

  if (!app) {
    throw new Error('Missing app')
  }

  const pages = app.pages
  const components = data.components

  const pagesElements = pages.flatMap((page) =>
    page.elements.map((element) => ({
      ...element,
      closestContainerNode: { id: page.id },
      page: { id: page.id },
    })),
  )

  const componentsElements = components.flatMap((component) =>
    component.elements.map((element) => ({
      ...element,
      closestContainerNode: { id: component.id },
      component: { id: component.id },
    })),
  )

  const elements = [...pagesElements, ...componentsElements]
  const resources = data.resources
  const authGuards = data.authGuards
  const redirects = data.redirects

  const props = elements
    .flatMap((element) => element.props)
    .concat(resources.map((resource) => resource.config))
    .concat(authGuards.map((authGuard) => authGuard.config))

  const pageStores = pages.map((page) => ({
    ...page.store,
    page: { id: page.id },
  }))

  const componentStores = components.map((component) => ({
    ...component.store,
    component: { id: component.id },
  }))

  const stores = [...pageStores, ...componentStores]
  const actions = stores.flatMap((store) => store.actions)

  const atoms = uniqueBy(
    [
      // Load all the atoms used by elements
      ...elements
        .flatMap((element) => element.renderType)
        .filter(
          (item): item is AtomBuilderFragment => item.__typename === 'Atom',
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
  const tags = atoms.flatMap((atom) => atom.tags)

  return {
    actions,
    app,
    atoms,
    authGuards,
    components,
    elements,
    fields,
    pages,
    props,
    redirects,
    resources: data.resources,
    stores,
    tags,
    types: [...types, ...elementsDependantTypes, ...systemTypes],
  }
}
