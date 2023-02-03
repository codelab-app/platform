import type {
  IComponent,
  IElement,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { isElement } from '@codelab/frontend/abstract/core'
import { getDefaultComponentFieldProps } from '@codelab/frontend/domain/component'
import { useStore } from '@codelab/frontend/presenter/container'
import { notify } from '@codelab/frontend/shared/utils'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import { useEffect, useState } from 'react'

const getNodeProps = (
  node: IElement | IComponent,
  renderer: IRenderer,
  editedProps: IPropData,
) => {
  if (isElement(node)) {
    // this is memoized by createTransformer, so we're effectively getting the last rendered output
    const renderOutput = renderer.renderIntermediateElement(node)

    return Array.isArray(renderOutput)
      ? mergeProps(renderOutput.map((o) => o.props))
      : renderOutput.props
  }

  // These are the component's api fields with defaultValues
  const defaultProps = getDefaultComponentFieldProps(node)

  // `editedProps` can be merged directly since it is in component builder only
  return mergeProps(defaultProps, node.props?.values, editedProps)
}

/**
 * If node is IComponent, that means we are viewing it in the component builder only.
 */
export const usePropsInspector = (
  node: IElement | IComponent,
  renderer: IRenderer,
  editedProps: IPropData,
) => {
  const { componentService, elementService } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const lastRenderedProps = getNodeProps(node, renderer, editedProps)
  const lastRenderedPropsString = propSafeStringify(lastRenderedProps ?? {})

  useEffect(() => {
    if (isElement(node)) {
      renderer.extraElementProps.setForElement(node.id, editedProps)

      return () => {
        renderer.extraElementProps.setForElement(node.id, {})
      }
    }

    return
  }, [editedProps])

  const save = async (data: IPropData) => {
    const jsonData = propSafeStringify(data)

    try {
      setIsLoading(true)

      if (isElement(node)) {
        await elementService.patchElement(node, {
          props: { update: { node: { data: jsonData } } },
        })
      } else {
        await componentService.patchComponent(node, {
          props: { update: { node: { data: jsonData } } },
        })
      }

      notify({
        title: `${isElement(node) ? 'Element' : 'Component'} props updated.`,
        type: 'success',
      })
    } catch (e) {
      console.error(e)
      notify({ title: 'Invalid json', type: 'warning' })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    lastRenderedPropsString,
    save,
    isLoading,
  }
}
