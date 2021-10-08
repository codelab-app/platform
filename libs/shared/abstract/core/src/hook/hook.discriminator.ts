/**
 * Used as __typename to discriminate between types
 */
export enum HookDiscriminator {
  GraphqlHookConfig = 'GraphqlHookConfig',
  QueryHookConfig = 'QueryHookConfig',
  QueryPageHookConfig = 'QueryPageHookConfig',
  QueryPagesHookConfig = 'QueryPagesHookConfig',
  RecoilStateHookConfig = 'RecoilStateHookConfig',
}
