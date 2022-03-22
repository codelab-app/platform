import { PropsData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { attempt, isError } from 'lodash'
import { RenderPipeFactory } from './types'

type TransformFn = (props: PropsData) => PropsData

const getTransformFn = (transformationJs: string): Maybe<TransformFn> => {
  if (!transformationJs) {
    return undefined
  }

  // eslint-disable-next-line no-eval
  const result = attempt(eval, `(${transformationJs})`) // the parentheses allow us to return a function from eval

  if (isError(result)) {
    console.warn('Error while evaluating prop transformation', result)

    return undefined
  }

  if (typeof result != 'function') {
    console.warn('Invalid Element props transformation function')

    return undefined
  }

  return result
}

const getTransformedProps = (
  transformFn: TransformFn,
  props: PropsData,
): Maybe<PropsData> => {
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
