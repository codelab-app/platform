import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderPipe'
import { getPropsByTypeKind } from '../utils/getPropsByTypeKind'
import { transformPropsToComponent } from '../utils/tranformPropsToComponent'

/**
 * Transforms the react node props
 */
export const reactNodePipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { typeKindsById } = context

    const reactNodeProps = getPropsByTypeKind(
      props,
      TypeKind.ReactNodeType,
      typeKindsById,
    )

    const transformedReactNodeProps = transformPropsToComponent(
      reactNodeProps,
      context,
      true,
      props,
    )

    return next(element, context, mergeProps(props, transformedReactNodeProps))
  }
