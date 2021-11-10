import { mergeProps } from '@codelab/shared/utils'
import { RenderPipeFactory } from '../types/RenderPipe'

export const persistedPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    try {
      return next(
        element,
        context,
        mergeProps(props, JSON.parse(element.props)),
      )
    } catch (e) {
      console.warn("Couldn't parse element props", element.props)

      return next(element, context, props)
    }
  }
