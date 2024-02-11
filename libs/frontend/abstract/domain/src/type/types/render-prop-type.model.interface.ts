import type {
  RenderPropTypeCreateInput,
  UpdateRenderPropTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  IRenderPropTypeDto,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Prop values for this type have the shape of {@see TypedProp} in order to
 * be distinguished from other element types.
 *
 * Comparison between different element types:
 * - RenderPropType: Component select box, results it `(props) => ReactNode` value
 * - ReactNodeType: Component select box, results it `ReactNode` value
 * - ElementType: Current tree element select box, results it `ReactNode` value
 */
export interface IRenderPropTypeModel
  extends IBaseTypeModel<
    IRenderPropTypeDto,
    RenderPropTypeCreateInput,
    UpdateRenderPropTypesMutationVariables
  > {
  kind: ITypeKind.RenderPropType
}
