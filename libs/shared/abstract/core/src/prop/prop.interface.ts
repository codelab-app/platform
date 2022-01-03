import { z } from 'zod'
import { IElement } from '../element'

export const PropSchema = z.object({
  id: z.string(),
  data: z.string(),
})

export type IProp = z.infer<typeof PropSchema>

export type PropData = Record<string, any>

export type PropDataByElementId = { [id: IElement['id']]: PropData }
