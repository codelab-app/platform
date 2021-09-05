import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type QueryHookConfigFragment = { body?: Types.Maybe<string>, method?: Types.Maybe<Types.QueryMethod>, queryKey: string, url?: Types.Maybe<string>, lambdaId?: Types.Maybe<string> };

export const QueryHookConfigFragmentDoc = gql`
    fragment QueryHookConfig on QueryHookConfig {
  body
  method
  queryKey
  url
  lambdaId
}
    `;