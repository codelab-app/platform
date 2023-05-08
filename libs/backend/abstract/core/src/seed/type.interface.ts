import { z } from 'zod'
import { AntDesignFieldSchema } from './field.interface'

/**
 * An atom can have more than one api
 */
export const AntDesignApiSchema = z.object({
  /**
   * This is the AntDesign components
   */
  atom: z.object({
    api: z.string(),
    name: z.string(),
  }),
  fields: z.array(AntDesignFieldSchema),
})

export type AntDesignApi = z.infer<typeof AntDesignApiSchema>
