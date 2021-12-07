import { z } from 'zod'

export const RouterConfigSchema = z.object({})

export type IRouterHookConfig = z.infer<typeof RouterConfigSchema>
