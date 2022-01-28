import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const AppTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.AppType).default(TypeKind.AppType),
})

/**
 * Allows choosing an app from the list of apps.
 *
 * TODO see how the app is handled in the render process
 */
export type IAppType = z.infer<typeof AppTypeSchema>
