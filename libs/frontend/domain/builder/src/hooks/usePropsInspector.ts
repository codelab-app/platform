import type {
  IComponent,
  IElement,
  IElementService,
  IInterfaceType,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { isElement } from '@codelab/frontend/abstract/core'
import { convertFieldsToProps } from '@codelab/frontend/domain/component'
import { notify } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import { useEffect, useState } from 'react'

const getNodeProps = (
  node: IElement | IComponent,
  renderer: IRenderer,
  updatedProps: IPropData,
) => {
  if (isElement(node)) {
    // this is memoized by createTransformer, so we're effectively getting the last rendered output
    const renderOutput = renderer.renderIntermediateElement(node)
    console.log('renderOutput', renderOutput)

    return Array.isArray(renderOutput)
      ? mergeProps(renderOutput.map((o) => o.props))
      : renderOutput.props
  }

  const defaultProps = convertFieldsToProps(
    (node.api.current as IInterfaceType).fields,
  )

  return mergeProps(defaultProps, node.props?.values, updatedProps)
}

export const usePropsInspector = (
  node: IElement | IComponent,
  renderer: IRenderer,
  elementService: IElementService,
  updatedProps: IPropData,
) => {
  const [isLoading, setIsLoading] = useState(false)
  console.log('node', node)

  console.log('updatedProps', updatedProps)

  const lastRenderedProps = getNodeProps(node, renderer, updatedProps)
  const lastRenderedPropsString = propSafeStringify(lastRenderedProps ?? {})

  useEffect(() => {
    if (isElement(node)) {
      renderer.extraElementProps.setForElement(node.id, updatedProps)

      return () => {
        renderer.extraElementProps.setForElement(node.id, {})
      }
    }

    return
  }, [node.props, updatedProps])

  const save = async (data: Maybe<string>) => {
    if (!data) {
      notify({ title: 'Invalid json', type: 'warning' })

      return
    }

    try {
      setIsLoading(true)

      if (isElement(node)) {
        await elementService.patchElement(node, {
          props: { update: { node: { data } } },
        })
      }
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
