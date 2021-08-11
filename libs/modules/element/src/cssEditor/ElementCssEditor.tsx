import {
  ElementFragment,
  refetchGetElementGraphQuery,
  useUpdateElementMutation,
} from '@codelab/codegen/graphql'
import { EmotionCssEditor, useDebouncedState } from '@codelab/frontend/shared'
import React, { useEffect, useState } from 'react'

export interface ElementCssEditorProps {
  element: ElementFragment
}

export const ElementCssEditor = ({ element }: ElementCssEditorProps) => {
  const [mutate] = useUpdateElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetElementGraphQuery({
        input: { elementId: element.id },
      }),
    ],
  })

  const [cssString, setCssString] = useState(element.css || '')
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
          elementId: element.id,
          updateData: {
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

ElementCssEditor.displayName = 'ElementCssEditor'
