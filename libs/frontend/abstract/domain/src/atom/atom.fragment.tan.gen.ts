import * as Types from '@codelab/shared/abstract/codegen'

import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.tan.gen'
import { TagFragment } from '../tag/tag.fragment.tan.gen'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.tan.gen'
import { TagFragmentDoc } from '../tag/tag.fragment.tan.gen'
export type AtomFragment = {
  __typename: 'Atom'
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  api: InterfaceTypeFragment
  requiredParents: Array<{ id: string; name: string; type: Types.AtomType }>
  suggestedChildren: Array<{ id: string; name: string; type: Types.AtomType }>
  tags: Array<TagFragment>
}

export type AtomDevelopmentFragment = {
  __typename: 'Atom'
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  api: InterfaceTypeFragment
  requiredParents: Array<{ id: string; name: string; type: Types.AtomType }>
  suggestedChildren: Array<{ id: string; name: string; type: Types.AtomType }>
  tags: Array<TagFragment>
}

export type AtomProductionFragment = {
  __typename: 'Atom'
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  icon?: string | null
  id: string
  name: string
  type: Types.AtomType
  requiredParents: Array<{ id: string; name: string; type: Types.AtomType }>
  suggestedChildren: Array<{ id: string; name: string; type: Types.AtomType }>
}

export const AtomFragmentDoc = `
    fragment Atom on Atom {
  __typename
  api {
    ...InterfaceType
  }
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...Tag
  }
  type
}
    ${InterfaceTypeFragmentDoc}
${TagFragmentDoc}`
export const AtomDevelopmentFragmentDoc = `
    fragment AtomDevelopment on Atom {
  __typename
  api {
    ...InterfaceType
  }
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  tags {
    ...Tag
  }
  type
}
    ${InterfaceTypeFragmentDoc}
${TagFragmentDoc}`
export const AtomProductionFragmentDoc = `
    fragment AtomProduction on Atom {
  __typename
  externalCssSource
  externalJsSource
  externalSourceType
  icon
  id
  name
  requiredParents {
    id
    name
    type
  }
  suggestedChildren {
    id
    name
    type
  }
  type
}
    `
