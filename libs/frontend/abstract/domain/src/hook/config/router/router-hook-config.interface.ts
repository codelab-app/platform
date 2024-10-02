import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

export const RouterConfigSchema = Type.Object({})

export type IRouterHookConfig = Static<typeof RouterConfigSchema>
