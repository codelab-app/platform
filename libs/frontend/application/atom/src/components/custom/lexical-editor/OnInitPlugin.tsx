import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
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
        const editorState = editor.parseEditorState(data)

        editor.setEditorState(editorState)
      }
    })
  }, [])

  useEffect(() => {
    editor.setEditable(editable)
  }, [editor, editable])

  return null
}
