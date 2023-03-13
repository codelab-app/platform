import type { IElementTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { IElementTypeDTO } from './element-type.dto.interface'

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
export interface IElementType extends IBaseType<IElementTypeDTO> {
  elementKind: IElementTypeKind
  kind: ITypeKind.ElementType
}
