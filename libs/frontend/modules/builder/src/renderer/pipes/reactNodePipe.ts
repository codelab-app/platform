import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderTypes'
import { getPropsByTypeKind } from '../utils/getPropsByTypeKind'
import { transformPropsToComponent } from '../utils/tranformPropsToComponent'

/**
 * Transforms the react node props
 */
export const reactNodePipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const reactNodeProps = getPropsByTypeKind(props, TypeKind.ReactNodeType)

    const transformedReactNodeProps = transformPropsToComponent(
      reactNodeProps,
      context,
      true,
      props,
    )

    return next(element, context, mergeProps(props, transformedReactNodeProps))
  }
