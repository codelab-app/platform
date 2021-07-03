import {
  refetchGetPageElementQuery,
  useUpdatePageElementMutation,
} from '@codelab/codegen/graphql'
import {
  EmotionCssEditor,
  PageElementNode,
  useDebouncedState,
} from '@codelab/frontend/shared'
import React, { useEffect, useState } from 'react'

export interface PageElementStyleEditorProps {
  pageElement: PageElementNode
}

export const PageElementStyleEditor = ({
  pageElement,
}: PageElementStyleEditorProps) => {
  const [mutate, { loading: updating, error }] = useUpdatePageElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetPageElementQuery({
        input: { pageElementId: pageElement.id },
      }),
    ],
  })

  const [cssString, setCssString] = useState(pageElement.css || '')
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
    if (cssDebounced) {
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
