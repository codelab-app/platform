import type { IPageBuilderQuery } from '@codelab/frontend/abstract/domain'
import type { AtomBuilderFragment } from '@codelab/shared/infra/gqlgen'

import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { uniqueBy } from 'remeda'

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
        CACHE_TAGS.PageBuilder(),
        CACHE_TAGS.ActionList(),
        CACHE_TAGS.AppList(),
        CACHE_TAGS.AtomList(),
        CACHE_TAGS.AuthGuardList(),
        CACHE_TAGS.ComponentsList(),
        CACHE_TAGS.ElementList(),
        CACHE_TAGS.FieldList(),
        CACHE_TAGS.PageList(),
        CACHE_TAGS.PropList(),
        CACHE_TAGS.RedirectList(),
        CACHE_TAGS.ResourceList(),
        CACHE_TAGS.StoreList(),
        CACHE_TAGS.TagList(),
        CACHE_TAGS.TypeList(),
      ],
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
