import * as Types from '@codelab/frontend/abstract/codegen'

import { AtomBaseFragment } from '../../../atom/src/Atom.fragment.graphql.gen'
import {
  TagFragment,
  TagEdgeFragment,
} from '../../../tag/src/use-cases/Tag.fragment.graphql.gen'
import { HookFragment } from './Hook.fragment.graphql.gen'
import { PropMapBindingFragment } from './PropMapBinding.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AtomBaseFragmentDoc } from '../../../atom/src/Atom.fragment.graphql.gen'
import {
  TagFragmentDoc,
  TagEdgeFragmentDoc,
} from '../../../tag/src/use-cases/Tag.fragment.graphql.gen'
import { HookFragmentDoc } from './Hook.fragment.graphql.gen'
import { PropMapBindingFragmentDoc } from './PropMapBinding.fragment.graphql.gen'
export type ElementFragment = {
  __typename: 'Element'
  id: string
  name?: Types.Maybe<string>
  css?: Types.Maybe<string>
  props: string
  renderForEachPropKey?: Types.Maybe<string>
  renderIfPropKey?: Types.Maybe<string>
  propTransformationJs?: Types.Maybe<string>
  atom?: Types.Maybe<AtomBaseFragment>
  componentTag?: Types.Maybe<TagFragment>
  hooks: Array<HookFragment>
  propMapBindings: Array<PropMapBindingFragment>
}

export const ElementFragmentDoc = gql`
  fragment Element on Element {
    __typename
    id
    name
    css
    atom {
      ...AtomBase
    }
    componentTag {
      ...Tag
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
  ${TagFragmentDoc}
  ${HookFragmentDoc}
  ${PropMapBindingFragmentDoc}
`
