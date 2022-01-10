import { z } from 'zod'
import { IElement } from '../element'

export const PropSchema = z.object({
  id: z.string(),
  data: z.string(),
})

export type IProp = z.infer<typeof PropSchema>

export type PropsData = Record<string, any>

export type PropsDataByElementId = { [id: IElement['id']]: PropsData }
