import type {
  IElementTypeDto,
  IElementTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type {
  ElementTypeCreateInput,
  UpdateElementTypesMutationVariables,
} from '@codelab/shared/infra/gql'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Allows picking an element from the current tree
 * Is passed to the rendered element as a React node
 *
 * Prop values for this type have the shape of {@see TypedProp} in order to
 * be distinguished from other element types.
 *
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it `(props) => ReactNode` value
 * - ReactNodeType: Component select box, results it `ReactNode` value
 * - ElementType: Current tree element select box, results it `ReactNode` value
 *
 * @property {ElementTypeKind} elementKind Allows scoping the type of element to only descendants, children or all elements
 *
 */
export interface IElementTypeModel
  extends IBaseTypeModel<
    IElementTypeDto,
    ElementTypeCreateInput,
    UpdateElementTypesMutationVariables
  > {
  elementKind: IElementTypeKind
  kind: ITypeKind.ElementType
}
