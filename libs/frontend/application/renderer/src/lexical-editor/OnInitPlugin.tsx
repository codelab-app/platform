import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical'
import React, { useEffect } from 'react'

export const OnInitPlugin = ({ data }: { data: string | undefined }) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Use the editor instance to initialize content
    editor.update(() => {
      const root = $getRoot()

      root.clear()

      // Assuming `data` is a string. For complex data structures, you'd parse and create nodes accordingly.
      if (data) {
        const paragraphNode = $createParagraphNode()
        const textNode = $createTextNode(JSON.parse(data))

        paragraphNode.append(textNode)
        root.append(paragraphNode)
      }
    })
  }, [])

  return null
}
