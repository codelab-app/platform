import { useDebouncedState } from '@codelab/frontend/shared/utils'
import {
  EmotionCssEditor,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ElementFragment,
  useGetElementQuery,
  useUpdateElementMutation,
} from '../graphql'

export interface ElementCssEditorInternalProps {
  element: ElementFragment
  trackPromises?: UseTrackLoadingPromises
}

const ElementCssEditorInternal = ({
  element,
  trackPromises,
}: ElementCssEditorInternalProps) => {
  const { trackPromise } = trackPromises ?? {}
  const [mutate] = useUpdateElementMutation()
  const [cssString, setCssString] = useState(element.css || '')
  // Keep the css string value in a ref so we can access it when unmounting the component
  const cssStringRef = useRef(cssString)
  cssStringRef.current = cssString

  const updateCss = useCallback(
    (newCss: string) => {
      const promise = mutate({
        variables: {
          input: {
            id: element.id,
            data: {
              atomId: element.atom?.id,
              name: element.name,
              css: newCss,
              renderIfPropKey: element.renderIfPropKey,
              // propTransformationJs: element.propTransformationJs,
              renderForEachPropKey: element.renderForEachPropKey,
            },
          },
        },
      })

      return trackPromise?.(promise) ?? promise
    },
    [element.atom?.id, element.id, element.name, mutate, trackPromise],
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
    if (typeof cssDebounced === 'string') {
      updateCss(cssDebounced)
    }
  }, [cssDebounced, updateCss])

  if (!element.atom) {
    return <>Add an atom to this element to edit its CSS</>
  }

  return (
    <EmotionCssEditor
      value={cssString}
      onChange={(v) => setCssString(v || '')}
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
  const { data } = useGetElementQuery({
    variables: { input: { where: { id: elementId } } },
  })

  const element = data?.getElement

  if (!element) {
    return null
  }

  return (
    <ElementCssEditorInternal element={element} trackPromises={trackPromises} />
  )
}
