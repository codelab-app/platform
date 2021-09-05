import { QueryHookConfigFragment } from './QueryHookConfig.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { QueryHookConfigFragmentDoc } from './QueryHookConfig.fragment.api.graphql.gen';
export type HookConfigFragment = (
  { __typename: 'QueryHookConfig' }
  & QueryHookConfigFragment
);

export const HookConfigFragmentDoc = gql`
    fragment HookConfig on HookConfig {
  __typename
  ...QueryHookConfig
}
    ${QueryHookConfigFragmentDoc}`;