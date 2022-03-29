import React from 'react'
import { MonacoEditor } from '../monaco'
import { EmotionCssEditorProps } from './EmotionCssEditorProps'

const EmotionCssEditor = (props: EmotionCssEditorProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MonacoEditor {...props} editorOptions={{ language: 'cssInJs' }} />
}

EmotionCssEditor.displayName = 'EmotionCssEditor'

export { EmotionCssEditor }
export default EmotionCssEditor
