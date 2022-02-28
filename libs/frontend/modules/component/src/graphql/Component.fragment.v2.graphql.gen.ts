import * as Types from '@codelab/shared/abstract/codegen-v2';

import { gql } from 'graphql-request';
export type ComponentFragment = { id: string, name: string, rootElement: { id: string, name?: string | null | undefined }, owner: { id: string, auth0Id: string } };

export const ComponentFragmentDoc = gql`
    fragment Component on Component {
  id
  name
  rootElement {
    id
    name
  }
  owner {
    id
    auth0Id
  }
}
    `;