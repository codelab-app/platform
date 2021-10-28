import * as Types from '@codelab/shared/codegen/graphql';

import { AtomFragment } from '../../../atom/src/Atom.fragment.graphql.gen';
import { HookFragment } from './Hook.fragment.graphql.gen';
import { PropMapBindingFragment } from './PropMapBinding.fragment.graphql.gen';
import { AtomFragmentDoc } from '../../../atom/src/Atom.fragment.graphql.gen';
import { HookFragmentDoc } from './Hook.fragment.graphql.gen';
import { PropMapBindingFragmentDoc } from './PropMapBinding.fragment.graphql.gen';
export type ElementFragment = { __typename: 'Element', id: string, name: string, css?: string | null | undefined, props: string, renderForEachPropKey?: string | null | undefined, renderIfPropKey?: string | null | undefined, propTransformationJs?: string | null | undefined, atom?: AtomFragment | null | undefined, hooks: Array<HookFragment>, propMapBindings: Array<PropMapBindingFragment> };

export const ElementFragmentDoc = `
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
  propMapBindings {
    ...PropMapBinding
  }
  propTransformationJs
}
    ${AtomFragmentDoc}
${HookFragmentDoc}
${PropMapBindingFragmentDoc}`;