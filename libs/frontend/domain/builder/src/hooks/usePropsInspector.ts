import type {
  IPageNodeRef,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { isElementPageNodeRef } from '@codelab/frontend/abstract/core'
import { getDefaultComponentFieldProps } from '@codelab/frontend/domain/component'
import { schemaTransformer } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import { createValidator } from '@codelab/frontend/presentation/view'
import { notify } from '@codelab/frontend/shared/utils'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import get from 'lodash/get'
import { useState } from 'react'
import { noop } from 'ts-essentials'

const getNodeProps = (
  node: IPageNodeRef,
  renderer: IRenderer,
  editedProps: IPropData,
) => {
  if (isElementPageNodeRef(node)) {
    // this is memoized by createTransformer, so we're effectively getting the last rendered output
    const renderOutput = renderer.renderIntermediateElement(node.current)

    return Array.isArray(renderOutput)
      ? mergeProps(renderOutput.map((output) => output.props))
      : renderOutput.props
  }

  // These are the component's api fields with defaultValues
  const defaultProps = getDefaultComponentFieldProps(node.current)

  // `editedProps` can be merged directly since it is in component builder only
  return mergeProps(
    defaultProps,
    node.current.props.current.values,
    editedProps,
  )
}

const getNodePropsValidateFn = (node: IPageNodeRef) => {
  const interfaceType = isElementPageNodeRef(node)
    ? node.current.renderType?.current.api.current ??
      node.current.renderType?.current.api.current
    : node.current.api.current

  if (!interfaceType) {
    return noop
  }

  const nodeApiSchema = schemaTransformer.transform(interfaceType)
  const validator = createValidator(nodeApiSchema)

  return (data: IPropData) => {
    const validation = validator(data)

    if (validation?.details.length) {
      throw new Error('Validation failed')
    }
  }
}

/**
 * If node is IComponent, that means we are viewing it in the component builder only.
 */
export const usePropsInspector = (
  node: IPageNodeRef,
  renderer: IRenderer,
  editedProps: IPropData,
) => {
  const { propService } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const validate = getNodePropsValidateFn(node)
  const lastRenderedProps = getNodeProps(node, renderer, editedProps)
  const lastRenderedPropsString = propSafeStringify(lastRenderedProps ?? {})

  const save = async (data: IPropData) => {
    const jsonData = propSafeStringify(data)

    try {
      setIsLoading(true)
      validate(data)

      await propService.update({
        data: jsonData,
        id: node.current.props.id,
      })

      notify({
        title: `${
          isElementPageNodeRef(node) ? 'Element' : 'Component'
        } props updated.`,
        type: 'success',
      })
    } catch (error) {
      console.error(error)
      notify({ title: get(error, 'message', 'Invalid json'), type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    lastRenderedPropsString,
    save,
  }
}
