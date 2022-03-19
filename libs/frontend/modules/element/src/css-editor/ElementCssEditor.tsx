import { useDebouncedState } from '@codelab/frontend/shared/utils'
import {
  EmotionCssEditor,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { isString } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ElementModel, ElementStore } from '../store'

export interface ElementCssEditorInternalProps {
  element: ElementModel
  elementStore: ElementStore
  trackPromises?: UseTrackLoadingPromises
}

export const ElementCssEditor = observer(
  ({ element, trackPromises, elementStore }: ElementCssEditorInternalProps) => {
    const { trackPromise } = trackPromises ?? {}
    const [cssString, setCssString] = useState(element.css || '')
    // Keep the css string value in a ref so we can access it when unmounting the component
    const cssStringRef = useRef(cssString)
    cssStringRef.current = cssString

    const updateCss = useCallback(
      (newCss: string) => {
        const promise = elementStore.updateElementCss(element, newCss)

        return trackPromise?.(promise) ?? promise
      },
      [element, elementStore, trackPromise],
    )

    useEffect(() => {
      // Make sure the new string is saved when unmounting the component
      // because if the panel is closed too quickly, the autosave won't catch the latest changes
      return () => {
        updateCss(cssStringRef.current).then()
      }
    }, [updateCss])

    // Debounce autosave, otherwise it will be too quick
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
  },
)
