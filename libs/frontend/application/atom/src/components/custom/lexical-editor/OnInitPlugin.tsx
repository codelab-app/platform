import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

export const OnInitPlugin = ({ data }: { data: string | undefined }) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Use the editor instance to initialize content
    editor.update(() => {
      if (data) {
        const editorState = editor.parseEditorState(data)

        editor.setEditorState(editorState)
      }
    })
  }, [])

  return null
}
