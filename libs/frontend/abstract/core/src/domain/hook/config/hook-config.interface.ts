import { z } from 'zod'
import type { IGraphqlHookConfig } from './graphql'
import { GraphqlHookConfigSchema } from './graphql'
import type { IQueryPageHookConfig } from './page'
import { QueryPageHookConfigSchema } from './page'
import type { IQueryPagesHookConfig } from './pages'
import { QueryPagesHookConfigSchema } from './pages'
import type { IQueryConfigHookConfig } from './query-config'
import { QueryConfigHookConfigSchema } from './query-config'
import type { IQueryLambdaHookConfig } from './query-lambda'
import { QueryLambdaHookConfigSchema } from './query-lambda'
import type { IRecoilStateHookConfig } from './recoil'
import { RecoilStateHookConfigSchema } from './recoil'

export type IHookConfig =
  | IGraphqlHookConfig
  | IQueryConfigHookConfig
  | IQueryLambdaHookConfig
  | IQueryPageHookConfig
  | IQueryPagesHookConfig
  | IRecoilStateHookConfig

export const HookConfigSchema: z.ZodSchema<IHookConfig> = z.union([
  GraphqlHookConfigSchema,
  QueryConfigHookConfigSchema,
  QueryPageHookConfigSchema,
  QueryPagesHookConfigSchema,
  RecoilStateHookConfigSchema,
  QueryLambdaHookConfigSchema,
])
