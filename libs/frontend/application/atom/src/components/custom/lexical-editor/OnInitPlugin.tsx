import { $generateNodesFromDOM } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, $insertNodes } from 'lexical'
import { useEffect } from 'react'

export const OnInitPlugin = ({
  data,
  editable,
}: {
  editable: boolean
  data: string | undefined
}) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      if (data) {
        // In the browser you can use the native DOMParser API to parse the HTML string.
        const parser = new DOMParser()
        const dom = parser.parseFromString(data, 'text/html')
        // Once you have the DOM instance it's easy to generate LexicalNodes.
        const nodes = $generateNodesFromDOM(editor, dom)

        // Select the root
        $getRoot().select()

        // Insert them at a selection.
        $insertNodes(nodes)
      }
    })
  }, [])

  useEffect(() => {
    editor.setEditable(editable)
  }, [editor, editable])

  return null
}
