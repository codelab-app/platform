import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type UnionTypeFragment = { id: string, name: string };

export const UnionTypeFragmentDoc = gql`
    fragment UnionType on UnionType {
  id
  name
}
    `;