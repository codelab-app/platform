import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.tan.gen'
import { PropFragment } from '../prop/prop.fragment.tan.gen'
import { StoreFragment } from '../store/store.fragment.tan.gen'
import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.tan.gen'
import {
  ElementFragment,
  ElementProductionFragment,
} from '../element/element.fragment.tan.gen'
import { OwnerFragmentDoc } from '../user/owner.fragment.tan.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.tan.gen'
import { StoreFragmentDoc } from '../store/store.fragment.tan.gen'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.tan.gen'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '../element/element.fragment.tan.gen'
export type ComponentFragment = {
  __typename: 'Component'
  id: string
  name: string
  api: { id: string }
  owner: OwnerFragment
  props: PropFragment
  rootElement: { id: string }
  store: StoreFragment
}

export type ComponentDevelopmentFragment = {
  __typename: 'Component'
  id: string
  name: string
  api: InterfaceTypeFragment
  elements: Array<ElementFragment>
  owner: OwnerFragment
  props: PropFragment
  rootElement: { id: string; name: string }
  store: StoreFragment
}

export type ComponentProductionFragment = {
  id: string
  name: string
  owner: OwnerFragment
  props: PropFragment
  rootElement: { id: string; name: string }
  store: StoreFragment
}

export const ComponentFragmentDoc = `
    fragment Component on Component {
  __typename
  api {
    id
  }
  id
  name
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
  }
  store {
    ...Store
  }
}
    ${OwnerFragmentDoc}
${PropFragmentDoc}
${StoreFragmentDoc}`
export const ComponentDevelopmentFragmentDoc = `
    fragment ComponentDevelopment on Component {
  __typename
  api {
    ...InterfaceType
  }
  elements {
    ...Element
  }
  id
  name
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
}
    ${InterfaceTypeFragmentDoc}
${ElementFragmentDoc}
${OwnerFragmentDoc}
${PropFragmentDoc}
${StoreFragmentDoc}`
export const ComponentProductionFragmentDoc = `
    fragment ComponentProduction on Component {
  id
  name
  owner {
    ...Owner
  }
  props {
    ...Prop
  }
  rootElement {
    id
    name
  }
  store {
    ...Store
  }
}
    ${OwnerFragmentDoc}
${PropFragmentDoc}
${StoreFragmentDoc}`
