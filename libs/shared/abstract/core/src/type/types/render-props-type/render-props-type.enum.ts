import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export const RenderPropsTypeSchema = BaseTypeSchema.extend({
  typeKind: z
    .literal(TypeKind.RenderPropsType)
    .default(TypeKind.RenderPropsType),
})

/**
 *
 *
 *
 * Prop values for this type have the shape of {@see TypedValue} in order to
 * be distinguished from other element types.
 *
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it `(props) => ReactNode` value
 * - ReactNodeType: Component select box, results it `ReactNode` value
 * - ElementType: Current tree element select box, results it `ReactNode` value
 */
export type IRenderPropsType = z.infer<typeof RenderPropsTypeSchema>
