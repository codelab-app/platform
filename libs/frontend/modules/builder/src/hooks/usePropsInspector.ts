import { Element, ElementService } from '@codelab/frontend/modules/element'
import { notify } from '@codelab/frontend/shared/utils'
import { PropsData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { mergeProps, propSafeStringify } from '@codelab/shared/utils'
import { autorun } from 'mobx'
import { useCallback, useEffect, useState } from 'react'
import { BuilderService } from '../store/BuilderService'

export const usePropsInspector = (
  element: Element,
  builderService: BuilderService,
  elementService: ElementService,
) => {
  const [persistedProps, setPersistedProps] = useState<Maybe<string>>()

  // this is memoized by createTransformer, so we're effectively getting the last rendered output
  const renderOutput =
    builderService.builderRenderer.renderElementIntermediate(element)

  const lastRenderedProps = Array.isArray(renderOutput)
    ? mergeProps(renderOutput.map((o) => o.props))
    : renderOutput.props

  // this is memoized by createTransformer, so we're effectively getting the last rendered output
  const renderOutput =
    builderService.builderRenderer.renderElementIntermediate(element)

  const lastRenderedProps = Array.isArray(renderOutput)
    ? mergeProps(renderOutput.map((o) => o.props))
    : renderOutput.props

  const setExtraProps = useCallback(
    (props: PropsData) =>
      builderService.builderRenderer.extraElementProps.setForElement(
        element.id,
        props,
      ),
    [builderService.builderRenderer.extraElementProps, element.id],
  )

  const save = async () => {
    if (!persistedProps) {
      notify({ title: 'Invalid json', type: 'warning' })

      return
    }

    try {
      await elementService.updateElementProps(
        element,
        JSON.parse(persistedProps),
      )
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
        setPersistedProps(element.props.toJsonString())
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
    isLoading: false,
    persistedProps,
    setPersistedProps,
    setExtraPropsForElement: setExtraProps,
  }
}
