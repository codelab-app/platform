import { z } from 'zod'

export const LambdaSchema = z.object({
  body: z.string(),
  id: z.string().default(''),
  name: z.string(),
  ownerId: z.string(),
})

export type ILambda = z.infer<typeof LambdaSchema>
