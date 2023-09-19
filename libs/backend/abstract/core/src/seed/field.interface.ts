import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const AntDesignFieldSchema = Type.Object({
  defaultValue: Type.String(),
  description: Type.String(),
  property: Type.String(),
  type: Type.String(),
  version: Type.String(),
})

export type AntDesignField = Static<typeof AntDesignFieldSchema>

/**
 * This is field of chatgpt generated data
 */
export interface HtmlField {
  key: string
  type: string
}
