import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type AppBaseFragment = { id: string, ownerId: string, name: string };

export const AppBaseFragmentDoc = gql`
    fragment AppBase on App {
  id
  ownerId
  name
}
    `;