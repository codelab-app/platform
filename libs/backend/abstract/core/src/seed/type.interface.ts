import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { AntDesignFieldSchema } from './field.interface'

/**
 * An atom can have more than one api
 */
export const AntDesignApiSchema = Type.Object({
  /**
   * This is the AntDesign components
   */
  atom: Type.Object({
    // api: Type.String(),
    name: Type.String(),
  }),
  fields: Type.Array(AntDesignFieldSchema),
})

export type AntDesignApi = Static<typeof AntDesignApiSchema>
