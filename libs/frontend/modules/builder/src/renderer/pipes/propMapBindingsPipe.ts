import { mergeProps } from '@codelab/shared/utils'
import { merge, partition } from 'lodash'
import { applyBinding } from '../utils/applyBinding'
import { RenderPipeFactory } from './types'

/**
 * Adds the prop map bindings to the context
 */
export const propMapBindingsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { extraElementProps } = context
    const { propMapBindings } = element

    const [childBindings, localBindings] = partition(
      propMapBindings,
      (x) => x.targetElementId,
    )

    const toTargetElements = childBindings.reduce((all, current) => {
      const targetElementId = current.targetElementId as string
      const previousBinding = all[targetElementId] ?? {}
      const newBindings = applyBinding(previousBinding, props, current)

      return { ...all, [targetElementId]: newBindings }
    }, extraElementProps ?? {})

    const toCurrentElement = localBindings.reduce((all, current) => {
      const bindings = applyBinding(all, props, current)

      return merge(all, bindings)
    }, {})

    const updatedContext = { ...context, extraElementProps: toTargetElements }
    const updatedProps = mergeProps(props, toCurrentElement)

    return next(element, updatedContext, updatedProps)
  }
