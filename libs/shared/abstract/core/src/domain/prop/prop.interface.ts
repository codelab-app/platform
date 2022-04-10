import { z } from 'zod'
import { IElement } from '../element'

export const PropSchema = z.object({
  id: z.string().default(''),
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

export type PropsData = Record<string, any>

export type PropsDataByElementId = { [id: IElement['id']]: PropsData }
