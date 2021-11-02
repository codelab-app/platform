import * as Types from '@codelab/shared/codegen/graphql'

import { AtomBaseFragment } from '../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen'
import { HookFragment } from '../../../../../../frontend/modules/element/src/graphql/Hook.fragment.graphql.gen'
import { PropMapBindingFragment } from '../../../../../../frontend/modules/element/src/graphql/PropMapBinding.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AtomBaseFragmentDoc } from '../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen'
import { HookFragmentDoc } from '../../../../../../frontend/modules/element/src/graphql/Hook.fragment.graphql.gen'
import { PropMapBindingFragmentDoc } from '../../../../../../frontend/modules/element/src/graphql/PropMapBinding.fragment.graphql.gen'
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
