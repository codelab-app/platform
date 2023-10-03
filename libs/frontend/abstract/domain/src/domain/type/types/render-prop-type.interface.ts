import type {
  RenderPropTypeCreateInput,
  UpdateRenderPropTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  IRenderPropTypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IBaseType } from './base-type.interface'

/**
 * Prop values for this type have the shape of {@see TypedProp} in order to
 * be distinguished from other element types.
 *
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it `(props) => ReactNode` value
 * - ReactNodeType: Component select box, results it `ReactNode` value
 * - ElementType: Current tree element select box, results it `ReactNode` value
 */
export interface IRenderPropType
  extends IBaseType<
    IRenderPropTypeDTO,
    RenderPropTypeCreateInput,
    UpdateRenderPropTypesMutationVariables
  > {
  kind: ITypeKind.RenderPropType
}
