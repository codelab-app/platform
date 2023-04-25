import type {
  ReactNodeTypeCreateInput,
  UpdateReactNodeTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { IReactNodeTypeDTO } from './react-node-type.dto.interface'

/**
 * Allows picking a Component from the list of components.
 *
 * Prop values for this type have the shape of {@see TypedValue} in order to
 * be distinguished from other element types.
 *
 * Comparison between different element types:
 * - RenderPropsType: Component select box, results it `(props) => ReactNode` value
 * - ReactNodeType: Component select box, results it `ReactNode` value
 * - ElementType: Current tree element select box, results it `ReactNode` value
 */
export interface IReactNodeType
  extends IBaseType<
    IReactNodeTypeDTO,
    ReactNodeTypeCreateInput,
    UpdateReactNodeTypesMutationVariables
  > {
  kind: ITypeKind.ReactNodeType
}
