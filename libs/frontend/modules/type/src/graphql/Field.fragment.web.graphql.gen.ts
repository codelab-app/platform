import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type FieldFragment = { id: string, key: string, name?: Types.Maybe<string>, description?: Types.Maybe<string> };

export const FieldFragmentDoc = gql`
    fragment Field on Field {
  id
  key
  name
  description
}
    `;