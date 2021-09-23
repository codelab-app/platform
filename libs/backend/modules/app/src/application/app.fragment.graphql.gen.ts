import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type TestAppFragment = { id: string, name: string, ownerId: string };

export const TestAppFragmentDoc = gql`
    fragment TestApp on App {
  id
  name
  ownerId
}
    `;