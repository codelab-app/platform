import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type AtomFragment = { id: string, name: string, type: Types.AtomType, api: { id: string, name: string } };

export const AtomFragmentDoc = gql`
    fragment Atom on Atom {
  id
  name
  type
  api {
    id
    name
  }
}
    `;