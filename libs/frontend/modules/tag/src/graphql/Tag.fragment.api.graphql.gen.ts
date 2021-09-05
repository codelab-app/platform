import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type TagFragment = { id: string, name: string };

export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  id
  name
}
    `;