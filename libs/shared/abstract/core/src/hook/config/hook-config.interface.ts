import { z } from 'zod'
import {
  GraphqlHookConfigSchema,
  IGraphqlHookConfig,
} from './graphql/graphql-hook-config.interface'
import {
  IQueryPageHookConfig,
  QueryPageHookConfigSchema,
} from './page/query-page-hook-config.interface'
import {
  IQueryPagesHookConfig,
  QueryPagesHookConfigSchema,
} from './pages/query-pages-hook-config.interface'
import {
  IQueryHookConfig,
  QueryHookConfigSchema,
} from './query/query-hook-config.interface'
import {
  IRecoilStateHookConfig,
  RecoilStateHookConfigSchema,
} from './recoil/recoil-state-hook-config.interface'

export type IHookConfig =
  | IGraphqlHookConfig
  | IQueryHookConfig
  | IQueryPageHookConfig
  | IQueryPagesHookConfig
  | IRecoilStateHookConfig

export const HookConfigSchema: z.ZodSchema<IHookConfig> = z.union([
  GraphqlHookConfigSchema,
  QueryHookConfigSchema,
  QueryPageHookConfigSchema,
  QueryPagesHookConfigSchema,
  RecoilStateHookConfigSchema,
])
