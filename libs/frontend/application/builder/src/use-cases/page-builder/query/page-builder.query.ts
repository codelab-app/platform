import type { IPageBuilderQuery } from '@codelab/frontend-abstract-domain'
import type { AtomBuilderFragment } from '@codelab/shared-infra-gqlgen'

import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { ITypeKind } from '@codelab/shared-abstract-core'
import { uniqueBy } from 'remeda'
import { v4 } from 'uuid'

import { GetPageBuilder } from './page-builder.api.graphql.web.gen'

export const pageBuilderQuery: IPageBuilderQuery = async ({
  appId,
  pageIds,
}: {
  appId: string
  pageIds?: Array<string>
}) => {
  const data = await GetPageBuilder(
    {
      appId,
      pageIds,
    },
    {
      // Include all the cache tags that are used in the page builder
      tags: [
        CACHE_TAGS.Page.builder(),
        CACHE_TAGS.Action.list(),
        CACHE_TAGS.App.list(),
        CACHE_TAGS.Atom.list(),
        CACHE_TAGS.AuthGuard.list(),
        CACHE_TAGS.Component.list(),
        CACHE_TAGS.Element.list(),
        CACHE_TAGS.Field.list(),
        CACHE_TAGS.Page.list(),
        CACHE_TAGS.Prop.list(),
        CACHE_TAGS.Redirect.list(),
        CACHE_TAGS.Resource.list(),
        CACHE_TAGS.Store.list(),
        CACHE_TAGS.Tag.list(),
        CACHE_TAGS.Type.list(),
      ],
      tracing: {
        operationId: 'page-builder-query',
        requestId: v4(),
      },
    },
  )

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
      page: element.page ? { id: element.page.id } : undefined,
    })),
  )

  const componentsElements = components.flatMap((component) =>
    component.elements.map((element) => ({
      ...element,
      closestContainerNode: { id: component.id },
      component: element.parentComponent
        ? { id: element.parentComponent.id }
        : undefined,
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

  const pageDependantTypes = pages.flatMap((page) => page.dependantTypes)

  const types = [
    ...atoms.flatMap((type) => type.api),
    ...stores.map((store) => store.api),
    ...components.map((component) => component.api),
    ...pageDependantTypes.filter(
      (type) => type.kind === ITypeKind.InterfaceType,
    ),
  ]

  const systemTypes = [
    ...data.codeMirrorTypes,
    ...data.anyTypes,
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
    types: [...types, ...pageDependantTypes, ...systemTypes],
  }
}
