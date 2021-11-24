import { z } from 'zod'
import { ElementGraphSchema } from '../../element'
import { PageSchema } from '../../page'
import { AppSchema } from '../app.interface'

export const ExportPageSchema = PageSchema.omit({
  id: true,
  elements: true,
}).extend({
  elements: ElementGraphSchema, // make it non-optional
})

export const ExportAppSchema = AppSchema.omit({
  id: true,
  ownerId: true,
  pages: true,
}).extend({
  pages: ExportPageSchema.array(),
})

export type IExportApp = z.infer<typeof ExportAppSchema>
