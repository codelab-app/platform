import { useDebouncedState } from '@codelab/frontend/shared/utils'
import {
  EmotionCssEditor,
  usePromisesLoadingIndicator,
} from '@codelab/frontend/view/components'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ElementFragment } from '../graphql'
import { refetchGetElementQuery, useGetElementQuery } from '../use-cases'
import { useUpdateElementMutation } from '../use-cases/update-element/UpdateElement.web.graphql.gen'

export interface ElementCssEditorInternalProps {
  element: ElementFragment
  loadingStateKey: string
}

const ElementCssEditorInternal = ({
  element,
  loadingStateKey,
}: ElementCssEditorInternalProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)

  const [mutate] = useUpdateElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetElementQuery({
        input: { where: { id: element.id } },
      }),
    ],
  })

  const [cssString, setCssString] = useState(element.css || '')
  // Keep the css string value in a ref so we can access it when unmounting the component
  const cssStringRef = useRef(cssString)
  cssStringRef.current = cssString

  const updateCss = useCallback(
    (newCss: string) => {
      return trackPromise(
        mutate({
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
        }),
      )
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
  loadingStateKey: string
}

export const ElementCssEditor = ({
  elementId,
  loadingStateKey,
}: ElementCssEditorProps) => {
  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { where: { id: elementId } } },
  })

  const element = data?.getElement

  if (!element) {
    return null
  }

  return (
    <ElementCssEditorInternal
      element={element}
      loadingStateKey={loadingStateKey}
    />
  )
}
