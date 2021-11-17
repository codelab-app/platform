import * as Types from '@codelab/frontend/abstract/codegen'

import {
  AtomBaseFragment,
  AtomFragment,
} from '../../../../../../frontend/modules/atom/src/graphql/Atom.fragment.graphql.gen'
import {
  HookFragment,
  PropMapBindingFragment,
} from '../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  AtomBaseFragmentDoc,
  AtomFragmentDoc,
} from '../../../../../../frontend/modules/atom/src/graphql/Atom.fragment.graphql.gen'
import {
  HookFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
export type TestElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null | undefined
  css?: string | null | undefined
  props: string
  renderForEachPropKey?: string | null | undefined
  renderIfPropKey?: string | null | undefined
  propTransformationJs?: string | null | undefined
  atom?: AtomBaseFragment | null | undefined
  componentTag?: { id: string; name: string } | null | undefined
  hooks: Array<HookFragment>
  propMapBindings: Array<PropMapBindingFragment>
}

export const TestElementFragmentDoc = gql`
  fragment TestElement on Element {
    __typename
    id
    name
    css
    atom {
      ...AtomBase
    }
    componentTag {
      id
      name
    }
    props
    hooks {
      ...Hook
    }
    renderForEachPropKey
    renderIfPropKey
    propMapBindings {
      ...PropMapBinding
    }
    propTransformationJs
  }
  ${AtomBaseFragmentDoc}
  ${HookFragmentDoc}
  ${PropMapBindingFragmentDoc}
`
