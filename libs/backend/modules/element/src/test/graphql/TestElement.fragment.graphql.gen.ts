import * as Types from '@codelab/frontend/abstract/codegen'

import {
  AtomBaseFragment,
  AtomFragment,
} from '../../../../../../frontend/modules/atom/src/graphql/Atom.fragment.graphql.gen'
import { TestTagFragment } from '../../../../tag/src/test/graphql/tag.fragment.graphql.gen'
import { PropFragment } from '../../../../prop/src/graphql/Prop.fragment.graphql.gen'
import {
  HookFragment,
  PropMapBindingFragment,
} from '../../../../../../frontend/modules/element/src/graphql/Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  AtomBaseFragmentDoc,
  AtomFragmentDoc,
} from '../../../../../../frontend/modules/atom/src/graphql/Atom.fragment.graphql.gen'
import { TestTagFragmentDoc } from '../../../../tag/src/test/graphql/tag.fragment.graphql.gen'
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
  fixedId?: string | null | undefined
  renderForEachPropKey?: string | null | undefined
  renderIfPropKey?: string | null | undefined
  propTransformationJs?: string | null | undefined
  instanceOfComponent?: { id: string } | null | undefined
  parentElement?: { id: string } | null | undefined
  atom?: AtomBaseFragment | null | undefined
  componentTag?: TestTagFragment | null | undefined
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
    fixedId
    instanceOfComponent {
      id
    }
    parentElement {
      id
    }
    atom {
      ...AtomBase
    }
    componentTag {
      ...TestTag
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
  ${TestTagFragmentDoc}
  ${PropFragmentDoc}
  ${HookFragmentDoc}
  ${PropMapBindingFragmentDoc}
`
