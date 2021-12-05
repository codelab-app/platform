import * as Types from '@codelab/frontend/abstract/codegen'

import {
  AtomBaseFragment,
  Export__AtomsFragment,
  AtomFragment,
} from '../../../../../../frontend/modules/atom/src/graphql/Atom.fragment.graphql.gen'
import { PropFragment } from '../../../../prop/src/graphql/Prop.fragment.graphql.gen'
import {
  HookFragment,
  PropMapBindingFragment,
} from '../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  AtomBaseFragmentDoc,
  Export__AtomsFragmentDoc,
  AtomFragmentDoc,
} from '../../../../../../frontend/modules/atom/src/graphql/Atom.fragment.graphql.gen'
import { PropFragmentDoc } from '../../../../prop/src/graphql/Prop.fragment.graphql.gen'
import {
  HookFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
export type TestElementFragment = {
  __typename: 'Element'
  id: string
  name?: string | null | undefined
  css?: string | null | undefined
  renderForEachPropKey?: string | null | undefined
  renderIfPropKey?: string | null | undefined
  propTransformationJs?: string | null | undefined
  atom?: AtomBaseFragment | null | undefined
  componentTag?: { id: string; name: string } | null | undefined
  props: PropFragment
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
    props {
      ...Prop
    }
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
  ${PropFragmentDoc}
  ${HookFragmentDoc}
  ${PropMapBindingFragmentDoc}
`
