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
        const parser = new DOMParser()
        const dom = parser.parseFromString(data, 'text/html')
        const nodes = $generateNodesFromDOM(editor, dom)

        $getRoot().select()
        $getRoot().clear()
        $insertNodes(nodes)
      }
    })
  }, [data])

  useEffect(() => {
    editor.setEditable(editable)
  }, [editor, editable])

  return null
}
