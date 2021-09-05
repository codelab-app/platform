import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type TestTagFragment = { id: string, name: string };

export const TestTagFragmentDoc = gql`
    fragment TestTag on Tag {
  id
  name
}
    `;