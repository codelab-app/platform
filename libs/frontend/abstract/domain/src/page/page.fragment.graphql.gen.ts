import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
import {
  ElementFragment,
  ElementProductionFragment,
} from '../element/element.fragment.graphql.gen'
import { StoreFragment } from '../store/store.fragment.graphql.gen'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '../element/element.fragment.graphql.gen'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
export type PagePreviewFragment = {
  id: string
  kind: Types.PageKind
  name: string
  urlPattern: string
  app: { id: string }
  rootElement: { id: string }
  store: { id: string }
}

export type PageFragment = {
  id: string
  kind: Types.PageKind
  name: string
  urlPattern: string
  app: { id: string }
  elements: Array<ElementFragment>
  pageContentContainer?: { id: string } | null
  redirect?: { id: string } | null
  rootElement: { id: string }
  store: StoreFragment
}

export type PageDevelopmentFragment = {
  id: string
  kind: Types.PageKind
  name: string
  urlPattern: string
  app: { id: string }
  elements: Array<ElementFragment>
  pageContentContainer?: { id: string } | null
  redirect?: { id: string } | null
  rootElement: { id: string }
  store: StoreFragment
}

export type PageProductionFragment = {
  id: string
  kind: Types.PageKind
  name: string
  slug: string
  urlPattern: string
  app: { id: string }
  elements: Array<ElementProductionFragment>
  pageContentContainer?: { id: string } | null
  redirect?: { id: string } | null
  rootElement: { id: string }
  store: StoreFragment
}

export const PagePreviewFragmentDoc = `
    fragment PagePreview on Page {
  app {
    id
  }
  id
  kind
  name
  rootElement {
    id
  }
  store {
    id
  }
  urlPattern
}
    `
export const PageFragmentDoc = `
    fragment Page on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
    ${ElementFragmentDoc}
${StoreFragmentDoc}`
export const PageDevelopmentFragmentDoc = `
    fragment PageDevelopment on Page {
  app {
    id
  }
  elements {
    ...Element
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
  urlPattern
}
    ${ElementFragmentDoc}
${StoreFragmentDoc}`
export const PageProductionFragmentDoc = `
    fragment PageProduction on Page {
  app {
    id
  }
  elements {
    ...ElementProduction
  }
  id
  kind
  name
  pageContentContainer {
    id
  }
  redirect {
    id
  }
  rootElement {
    id
  }
  slug
  store {
    ...Store
  }
  urlPattern
}
    ${ElementProductionFragmentDoc}
${StoreFragmentDoc}`
