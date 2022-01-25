import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'
import { ElementTypeKind } from './element-type.enum'

export const ElementTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.ElementType).default(TypeKind.ElementType),
  elementKind: z.nativeEnum(ElementTypeKind),
})

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 *
 * Prop values for this type have the shape of {@see TypedValue} in order to
 * be distinguished from other element types.
 *
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it `(props) => ReactNode` value
 * - ReactNodeType: Component select box, results it `ReactNode` value
 * - ElementType: Current tree element select box, results it `ReactNode` value
 *
 * @property {ElementTypeKind} elementKind Allows scoping the type of element to only descendants, children or all elements
 *
 */
export type IElementType = z.infer<typeof ElementTypeSchema>
