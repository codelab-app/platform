import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderPipe'
import { getPropsByTypeKind } from '../utils/getPropsByTypeKind'
import { transformPropsToComponent } from '../utils/tranformPropsToComponent'

export const renderPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { typeKindsById } = context

    const renderProps = getPropsByTypeKind(
      props,
      TypeKind.RenderPropsType,
      typeKindsById,
    )

    const transformedRenderProps = transformPropsToComponent(
      renderProps,
      context,
      false,
      props,
    )

    return next(element, context, mergeProps(props, transformedRenderProps))
  }
