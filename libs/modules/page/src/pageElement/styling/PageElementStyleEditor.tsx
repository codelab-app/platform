import {
  refetchGetPageElementQuery,
  useUpdatePageElementMutation,
} from '@codelab/codegen/graphql'
import {
  ElementNode,
  EmotionCssEditor,
  useDebouncedState,
} from '@codelab/frontend/shared'
import React, { useEffect, useState } from 'react'

export interface PageElementStyleEditorProps {
  pageElement: ElementNode
}

export const PageElementStyleEditor = ({
  pageElement,
}: PageElementStyleEditorProps) => {
  const [mutate] = useUpdatePageElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetPageElementQuery({
        input: { pageElementId: pageElement.id },
      }),
    ],
  })

  const [cssString, setCssString] = useState(pageElement.css || '')
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
          pageElementId: pageElement.id,
          updateData: {
            atomId: pageElement.atom?.id,
            name: pageElement.name,
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

  return (
    <EmotionCssEditor
      width="100%"
      height="100%"
      value={cssString}
      onChange={(v) => setCssString(v || '')}
    />
  )
}

PageElementStyleEditor.displayName = 'PageElementStyleEditor'
