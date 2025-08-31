import { Type } from '@sinclair/typebox'

import type { IGraphqlHookConfig } from './graphql'
import type { IQueryPageHookConfig } from './page'
import type { IQueryPagesHookConfig } from './pages'
import type { IQueryConfigHookConfig } from './query-config'
import type { IQueryLambdaHookConfig } from './query-lambda'

import { GraphqlHookConfigSchema } from './graphql'
import { QueryPageHookConfigSchema } from './page'
import { QueryPagesHookConfigSchema } from './pages'
import { QueryConfigHookConfigSchema } from './query-config'
import { QueryLambdaHookConfigSchema } from './query-lambda'

export type IHookConfig =
  | IGraphqlHookConfig
  | IQueryConfigHookConfig
  | IQueryLambdaHookConfig
  | IQueryPageHookConfig
  | IQueryPagesHookConfig

export const HookConfigSchema = Type.Union([
  GraphqlHookConfigSchema,
  QueryConfigHookConfigSchema,
  QueryPageHookConfigSchema,
  QueryPagesHookConfigSchema,
  QueryLambdaHookConfigSchema,
])
