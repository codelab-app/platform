import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type InterfaceFragment = { __typename: 'InterfaceType', id: string, name: string };

export const InterfaceFragmentDoc = gql`
    fragment Interface on InterfaceType {
  __typename
  id
  name
}
    `;