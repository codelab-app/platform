import * as Types from '@codelab/frontend/abstract/codegen'

import {
  AtomBaseFragment,
  AtomFragment,
} from '../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen'
import { HookFragment } from '../../../../../../frontend/modules/element/src/graphql/Hook.fragment.graphql.gen'
import { PropMapBindingFragment } from '../../../../../../frontend/modules/element/src/graphql/PropMapBinding.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  AtomBaseFragmentDoc,
  AtomFragmentDoc,
} from '../../../../../../frontend/modules/atom/src/Atom.fragment.graphql.gen'
import { HookFragmentDoc } from '../../../../../../frontend/modules/element/src/graphql/Hook.fragment.graphql.gen'
import { PropMapBindingFragmentDoc } from '../../../../../../frontend/modules/element/src/graphql/PropMapBinding.fragment.graphql.gen'
export type TestElementFragment = {
  __typename: 'Element'
  id: string
  name?: Types.Maybe<string>
  css?: Types.Maybe<string>
  props: string
  renderForEachPropKey?: Types.Maybe<string>
  renderIfPropKey?: Types.Maybe<string>
  propTransformationJs?: Types.Maybe<string>
  atom?: Types.Maybe<AtomBaseFragment>
  componentTag?: Types.Maybe<{ id: string; name: string }>
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
