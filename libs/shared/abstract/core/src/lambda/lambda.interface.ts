import { z } from 'zod'

export const LambdaSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  name: z.string(),
  body: z.string(),
})

export type ILambda = z.infer<typeof LambdaSchema>
