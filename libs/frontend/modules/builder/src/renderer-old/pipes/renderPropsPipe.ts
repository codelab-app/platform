import { TypeKind } from '@codelab/shared/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import { getPropsByTypeKind, transformPropsToComponentFn } from '../utils'
import { RenderPipeFactory } from './types'

export const renderPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const renderProps = getPropsByTypeKind(
      props,
      TypeKind.RenderPropsType,
      context.typesById,
    )

    const transformedRenderProps = transformPropsToComponentFn(
      renderProps,
      context,
      props,
    )

    return next(element, context, mergeProps(props, transformedRenderProps))
  }
