import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type PropMapBindingFragment = { id: string, sourceKey: string, targetElementId?: Types.Maybe<string>, targetKey: string };

export const PropMapBindingFragmentDoc = gql`
    fragment PropMapBinding on PropMapBinding {
  id
  sourceKey
  targetElementId
  targetKey
}
    `;