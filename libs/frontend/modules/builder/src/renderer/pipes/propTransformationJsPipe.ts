import { mergeProps } from '@codelab/shared/utils'
import { attempt } from 'lodash'
import { isError } from 'react-query'
import { RenderPipelineProps } from '../../store'
import { RenderPipeFactory } from './types'

type TransformFn = (props: RenderPipelineProps) => RenderPipelineProps

const getTransformFn = (transformationJs: string): TransformFn | undefined => {
  // eslint-disable-next-line no-eval
  const restful = attempt(eval, `(${transformationJs})`) // the parentheses allow us to return a function from eval

  if (isError(restful)) {
    console.warn('Error while evaluating prop transformation', restful)

    return undefined
  }

  if (typeof restful != 'function') {
    console.warn('Invalid transformation function')

    return undefined
  }

  return restful
}

const getTransformedProps = (
  transformFn: TransformFn,
  props: RenderPipelineProps,
): RenderPipelineProps | undefined => {
  const restful = attempt(transformFn, props)

  if (isError(restful)) {
    console.warn('Unable to transform props')

    return undefined
  }

  return restful
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
