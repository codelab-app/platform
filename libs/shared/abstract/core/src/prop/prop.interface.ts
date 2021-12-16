import { z } from 'zod'

export const PropSchema = z.object({
  id: z.string().nullish(),
  data: z
    .string()
    .default('{}')
    .superRefine((data, ctx) => {
      try {
        JSON.parse(data)
      } catch (e: any) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Props.data must be a valid JSON string. ' + e.message,
        })
      }
    }),
})

export type IProp = z.infer<typeof PropSchema>
