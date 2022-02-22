import { useDebouncedState } from '@codelab/frontend/shared/utils'
import {
  EmotionCssEditor,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { IElement } from '@codelab/shared/abstract/core'
import { isString } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGetElementById } from '../hooks'
import { useUpdateElementsMutation } from '../store'

export interface ElementCssEditorInternalProps {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
}

const ElementCssEditorInternal = ({
  element,
  trackPromises,
}: ElementCssEditorInternalProps) => {
  const { trackPromise } = trackPromises ?? {}
  const [mutate] = useUpdateElementsMutation()
  const [cssString, setCssString] = useState(element.css || '')
  // Keep the css string value in a ref so we can access it when unmounting the component
  const cssStringRef = useRef(cssString)
  cssStringRef.current = cssString

  const updateCss = useCallback(
    (newCss: string) => {
      const promise = mutate({
        variables: { where: { id: element.id }, update: { css: newCss } },
      })

      return trackPromise?.(promise) ?? promise
    },
    [element.id, mutate, trackPromise],
  )

  useEffect(() => {
    // Make sure the new string is saved when unmounting the component
    // because if the panel is closed too quickly, the autosave won't catch the latest changes
    return () => {
      updateCss(cssStringRef.current).then()
    }
  }, [updateCss])

  // Debounce the autosaving, otherwise it will be too quick
  // Getting a dgraph  error if this is too fast, like 500ms
  const [cssDebounced, setCssDebounced] = useDebouncedState(1000, cssString)

  useEffect(() => {
    setCssDebounced(cssString)
  }, [cssString, setCssDebounced])

  useEffect(() => {
    if (isString(cssDebounced)) {
      updateCss(cssDebounced)
    }
  }, [cssDebounced, updateCss])

  if (!element.atom) {
    return <>Add an atom to this element to edit its CSS</>
  }

  return (
    <EmotionCssEditor
      onChange={(v) => setCssString(v || '')}
      value={cssString}
    />
  )
}

export type ElementCssEditorProps = {
  elementId: string
  trackPromises?: UseTrackLoadingPromises
}

export const ElementCssEditor = ({
  elementId,
  trackPromises,
}: ElementCssEditorProps) => {
  const element = useGetElementById(elementId)

  if (!element) {
    return null
  }

  return (
    <ElementCssEditorInternal element={element} trackPromises={trackPromises} />
  )
}
