import { z } from 'zod'
import { PageSchema } from '../../page'
import { AppSchema } from '../app.interface'

export const ExportPageSchema = PageSchema.omit({
  id: true,
})

export const ExportAppSchema = AppSchema.omit({
  id: true,
  ownerId: true,
  pages: true,
}).extend({
  pages: ExportPageSchema.array(),
})

export type IExportApp = z.infer<typeof ExportAppSchema>
