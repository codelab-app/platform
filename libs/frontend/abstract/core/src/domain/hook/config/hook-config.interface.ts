import { z } from 'zod'
import { GraphqlHookConfigSchema, IGraphqlHookConfig } from './graphql'
import { IQueryPageHookConfig, QueryPageHookConfigSchema } from './page'
import { IQueryPagesHookConfig, QueryPagesHookConfigSchema } from './pages'
import {
  IQueryConfigHookConfig,
  QueryConfigHookConfigSchema,
} from './query-config'
import {
  IQueryLambdaHookConfig,
  QueryLambdaHookConfigSchema,
} from './query-lambda'
import { IRecoilStateHookConfig, RecoilStateHookConfigSchema } from './recoil'

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
