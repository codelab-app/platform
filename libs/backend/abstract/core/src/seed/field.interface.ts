import { z } from 'zod'

export const AntDesignFieldSchema = z.object({
  defaultValue: z.string(),
  description: z.string(),
  property: z.string(),
  type: z.string(),
  version: z.string(),
})

export type AntDesignField = z.infer<typeof AntDesignFieldSchema>

/**
 * This is field of chatgpt generated data
 */
export interface HtmlField {
  key: string
  type: string
}
