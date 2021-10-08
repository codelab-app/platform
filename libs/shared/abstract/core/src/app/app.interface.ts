import { z } from 'zod'
import { IPage, PageSchema } from '../page/page.interface'

// export interface IApp {
//   id: string
//   ownerId: string
//   name: string
//   pages: Array<IPage>
// }

export const AppSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  name: z.string(),
  pages: z.array(PageSchema).default([]),
})

export type IApp = z.infer<typeof AppSchema>
