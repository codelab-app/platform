// export const ExportPageSchema = PageSchema.extend({
//   id: z.string(),
//   elements: ElementGraphSchema, // make it non-optional
// })

// export const ExportAppSchema = AppSchema.omit({
//   ownerId: true,
//   pages: true,
// }).extend({
//   id: z.string(),
//   pages: ExportPageSchema.array(),
// })

// export type IExportApp = z.infer<typeof ExportAppSchema>

// export type IExportPage = z.infer<typeof ExportPageSchema>
