import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type ComponentFragment = { __typename: 'Component', id: string, name: string };

export const ComponentFragmentDoc = gql`
    fragment Component on Component {
  __typename
  id
  name
}
    `;