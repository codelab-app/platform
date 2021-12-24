import { mergeProps } from '@codelab/shared/utils'
import { merge } from 'lodash'
import { applyBinding } from '../utils/applyBinding'
import { RenderPipeFactory } from './types'

/**
 * Adds the prop map bindings to the context
 */
export const propMapBindingsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const { extraElementProps } = context
    const { propMapBindings } = element

    const toTargetElements = propMapBindings
      .filter((x) => x.targetElementId)
      .reduce((all, current) => {
        const targetId = current.targetElementId as keyof typeof all
        const targetElementBinding = all[targetId] ?? {}
        const bindings = applyBinding(targetElementBinding, props, current)

        return { ...all, [targetId]: bindings }
      }, extraElementProps ?? {})

    const toCurrentElement = propMapBindings
      .filter((x) => !x.targetElementId)
      .reduce((all, current) => {
        const bindings = applyBinding(all, props, current)

        return merge(all, bindings)
      }, {})

    const updatedContext = { ...context, extraElementProps: toTargetElements }
    const updatedProps = mergeProps(props, toCurrentElement)

    return next(element, updatedContext, updatedProps)
  }
