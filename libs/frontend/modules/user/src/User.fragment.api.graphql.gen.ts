import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type __UserFragment = { email?: Types.Maybe<string>, name?: Types.Maybe<string>, id?: Types.Maybe<string> };

export const __UserFragmentDoc = gql`
    fragment __User on User {
  id: user_id
  email
  name
}
    `;