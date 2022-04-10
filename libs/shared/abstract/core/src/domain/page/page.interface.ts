import { IEntity } from '@codelab/shared/abstract/types'
import { z } from 'zod'

export const PageSchema = z.object({
  id: z.string().default(''),
  name: z.string(),
  rootElement: z.object({ id: z.string(), name: z.string().nullish() }),
  app: z.object({
    rootProviderElement: z.object({
      id: z.string(),
      name: z.string().nullish(),
    }),
  }),
})

// export type IPage = z.infer<typeof PageSchema>

export interface IPage extends IEntity {
  appId: string
  name: string
  rootElementId: string
  providerElementId: string
}
