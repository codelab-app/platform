import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type InterfaceFragment = { id: string, name: string };

export const InterfaceFragmentDoc = gql`
    fragment Interface on InterfaceType {
  id
  name
}
    `;