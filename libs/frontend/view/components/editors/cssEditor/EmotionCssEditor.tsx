import React from 'react'
import { MonacoEditor } from '../monaco'
import { EmotionCssEditorProps } from './EmotionCssEditorProps'

const EmotionCssEditor = (props: EmotionCssEditorProps) => {
  return <MonacoEditor {...props} editorOptions={{ language: 'cssInJs' }} />
}

EmotionCssEditor.displayName = 'EmotionCssEditor'

export { EmotionCssEditor }
export default EmotionCssEditor
