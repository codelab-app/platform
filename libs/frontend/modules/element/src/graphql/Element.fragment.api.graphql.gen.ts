import * as Types from '@codelab/shared/codegen/graphql';

import { AtomFragment } from '../../../atom/src/Atom.fragment.api.graphql.gen';
import { HookFragment } from './Hook.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { AtomFragmentDoc } from '../../../atom/src/Atom.fragment.api.graphql.gen';
import { HookFragmentDoc } from './Hook.fragment.api.graphql.gen';
export type ElementFragment = { __typename: 'Element', id: string, name: string, css?: Types.Maybe<string>, props: string, renderForEachPropKey?: Types.Maybe<string>, renderIfPropKey?: Types.Maybe<string>, atom?: Types.Maybe<AtomFragment>, hooks: Array<HookFragment> };

export const ElementFragmentDoc = gql`
    fragment Element on Element {
  __typename
  id
  name
  css
  atom {
    ...Atom
  }
  props
  hooks {
    ...Hook
  }
  renderForEachPropKey
  renderIfPropKey
}
    ${AtomFragmentDoc}
${HookFragmentDoc}`;