export interface IComponent {
  id: string
  name: string
  rootElementId: string
  ownerId: string
}

// export const ComponentSchema = z.object({
//   id: z.string().default(''),
//   name: z.string(),
//   rootElement: z.object({ id: z.string(), name: z.string().nullish() }),
//   owner: z.object({ id: z.string().nullish(), auth0Id: z.string() }),
// })

// export type IComponent = z.infer<typeof ComponentSchema>
