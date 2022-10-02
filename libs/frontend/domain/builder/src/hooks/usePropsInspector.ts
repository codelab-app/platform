import {
  IElement,
  IElementService,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { notify } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import { autorun } from 'mobx'
import { useCallback, useEffect, useState } from 'react'

export const usePropsInspector = (
  element: IElement,
  renderer: IRenderer,
  elementService: IElementService,
) => {
  const [isLoading, setIsLoading] = useState(false)

  const [persistedProps, setPersistedProps] = useState<Maybe<string>>(
    element.props?.jsonString ?? '{}',
  )

  // this is memoized by createTransformer, so we're effectively getting the last rendered output
  const renderOutput = renderer.renderIntermediateElement(element)

  const lastRenderedProps = Array.isArray(renderOutput)
    ? mergeProps(renderOutput.map((o) => o.props))
    : renderOutput.props

  const setExtraProps = useCallback(
    (props: IPropData) =>
      renderer.extraElementProps.setForElement(element.id, props),
    [renderer.extraElementProps, element.id],
  )

  const save = async (data: Maybe<string>) => {
    if (!data) {
      notify({ title: 'Invalid json', type: 'warning' })

      return
    }

    try {
      setIsLoading(true)
      await elementService.patchElement(element, {
        props: { update: { node: { data } } },
      })
    } catch (e) {
      console.error(e)
      notify({ title: 'Invalid json', type: 'warning' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(
    () =>
      autorun(() => {
        setPersistedProps(element.props?.jsonString ?? '{}')
      }),
    [element.props],
  )

  useEffect(() => {
    return () => {
      setExtraProps({})
    }
  }, [setExtraProps])

  const lastRenderedPropsString = propSafeStringify(lastRenderedProps ?? {})

  return {
    lastRenderedPropsString,
    save,
    isLoading,
    persistedProps,
    setPersistedProps,
    setExtraPropsForElement: setExtraProps,
  }
}
