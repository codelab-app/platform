import { z } from 'zod'
import { PageSchema } from '../page'

// export interface IApp {
//   id: string
//   ownerId: string
//   name: string
//   pages: Array<IPage>
// }

export const AppSchema = z.object({
  id: z.string().default(''),
  ownerId: z.string(),
  name: z.string(),
  pages: z.array(PageSchema).default([]),
})

export type IApp = z.infer<typeof AppSchema>
