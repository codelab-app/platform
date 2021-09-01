import { useDebouncedState } from '@codelab/frontend/shared/utils'
import { EmotionCssEditor } from '@codelab/frontend/view/components'
import React, { useEffect, useRef, useState } from 'react'
import { ElementFragment } from '../graphql/Element.fragment.api.graphql'
import {
  refetchGetElementQuery,
  useGetElementQuery,
} from '../use-cases/get-element/GetElement.api.graphql'
import { useUpdateElementMutation } from '../use-cases/update-element/UpdateElement.api.graphql'

export interface ElementCssEditorInternalProps {
  element: ElementFragment
}

const ElementCssEditorInternal = ({
  element,
}: ElementCssEditorInternalProps) => {
  const [mutate] = useUpdateElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetElementQuery({
        input: { elementId: element.id },
      }),
    ],
  })

  const [cssString, setCssString] = useState(element.css || '')
  // Keep the css string value in a ref so we can access it when unmounting the component
  const cssStringRef = useRef(cssString)

  useEffect(() => {
    cssStringRef.current = cssString
  }, [cssString])

  useEffect(() => {
    // Make sure the new string is saved when unmounting the component
    // because if the panel is closed too quickly, the autosave won't catch the latest changes
    return () => {
      updateCss(cssStringRef.current).then()
    }
  }, [])

  // Debounce the autosaving, otherwise it will be too quick
  // Getting a dgraph  error if this is too fast, like 500ms
  const [cssDebounced, setCssDebounced] = useDebouncedState(1000, cssString)

  useEffect(() => {
    setCssDebounced(cssString)
  }, [cssString, setCssDebounced])

  const updateCss = (newCss: string) => {
    return mutate({
      variables: {
        input: {
          id: element.id,
          data: {
            atomId: element.atom?.id,
            name: element.name,
            css: newCss,
          },
        },
      },
    })
  }

  useEffect(() => {
    if (typeof cssDebounced === 'string') {
      updateCss(cssDebounced).then()
    }
  }, [cssDebounced])

  if (!element.atom) {
    return <>Add an atom to this element to edit its CSS</>
  }

  return (
    <EmotionCssEditor
      width="100%"
      height="100%"
      value={cssString}
      onChange={(v) => setCssString(v || '')}
    />
  )
}

export type ElementCssEditorProps = { elementId: string }

export const ElementCssEditor = ({ elementId }: ElementCssEditorProps) => {
  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { elementId } },
  })

  const element = data?.getElement

  if (!element) {
    return null
  }

  return <ElementCssEditorInternal element={element} />
}
