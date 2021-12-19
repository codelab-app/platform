import { mergeProps } from '@codelab/shared/utils'
import { attempt, isError } from 'lodash'
import { RenderPipeFactory } from './types'

export const persistedPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const persistedProps = attempt(JSON.parse, element.props.data)

    if (isError(persistedProps)) {
      // TODO: should notify user via notification
      console.warn("Couldn't parse element props", element.props)

      return next(element, context, props)
    }

    return next(element, context, mergeProps(props, persistedProps))
  }
