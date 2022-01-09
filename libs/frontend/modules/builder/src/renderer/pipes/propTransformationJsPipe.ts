import { mergeProps } from '@codelab/shared/utils'
import { attempt } from 'lodash'
import { isError } from 'react-query'
import { RenderPipelineProps } from '../../store'
import { RenderPipeFactory } from './types'

type TransformFn = (props: RenderPipelineProps) => RenderPipelineProps

const getTransformFn = (transformationJs: string): TransformFn | undefined => {
  // eslint-disable-next-line no-eval
  const result = attempt(eval, `(${transformationJs})`) // the parentheses allow us to return a function from eval

  if (isError(result)) {
    console.warn('Error while evaluating prop transformation', result)

    return undefined
  }

  if (typeof result != 'function') {
    console.warn('Invalid transformation function')

    return undefined
  }

  return result
}

const getTransformedProps = (
  transformFn: TransformFn,
  props: RenderPipelineProps,
): RenderPipelineProps | undefined => {
  const result = attempt(transformFn, props)

  if (isError(result)) {
    console.warn('Unable to transform props')

    return undefined
  }

  return result
}

/*
 * Evaluates the prop transformation js
 */
export const propTransformationJsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { propTransformationJs } = element

    if (!propTransformationJs) {
      return next(element, context, props)
    }

    const transformFn = getTransformFn(propTransformationJs)

    if (!transformFn) {
      return next(element, context, props)
    }

    const transformedProps = getTransformedProps(transformFn, props)

    const finalProps = transformedProps
      ? mergeProps(props, transformedProps)
      : props

    return next(element, context, finalProps)
  }
