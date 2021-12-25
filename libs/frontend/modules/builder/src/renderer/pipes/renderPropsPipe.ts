import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import { getPropsByTypeKind } from '../utils/getPropsByTypeKind'
import { transformPropsToComponent } from '../utils/tranformPropsToComponent'
import { RenderPipeFactory } from './types'

export const renderPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const renderProps = getPropsByTypeKind(props, TypeKind.RenderPropsType)

    const transformedRenderProps = transformPropsToComponent(
      renderProps,
      context,
      false,
      props,
    )

    return next(element, context, mergeProps(props, transformedRenderProps))
  }
