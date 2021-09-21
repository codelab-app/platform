import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type AppFragment = { id: string, name: string };

export const AppFragmentDoc = gql`
    fragment App on App {
  id
  name
}
    `;