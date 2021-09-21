import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type AtomFragment = { __typename: 'Atom', id: string, name: string, type: Types.AtomType, api: { __typename: 'InterfaceType', id: string, name: string } };

export const AtomFragmentDoc = gql`
    fragment Atom on Atom {
  __typename
  id
  name
  type
  api {
    __typename
    id
    name
  }
}
    `;