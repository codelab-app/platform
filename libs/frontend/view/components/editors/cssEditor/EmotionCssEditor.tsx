import { css, cssCompletionSource } from '@codemirror/lang-css'
import React from 'react'
import { CodeMirrorInput, CodeMirrorInputProps } from '../CodeMirror'

const EmotionCssEditor = (props: CodeMirrorInputProps) => {
  const { extensions = [] } = props
  const mergedExtensions = [css(), ...extensions]

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <CodeMirrorInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      defaultCompletionSource={cssCompletionSource}
      extensions={mergedExtensions}
      shouldDisableNewLines={false}
      title="CSS Editor"
    />
  )
}

EmotionCssEditor.displayName = 'EmotionCssEditor'

export { EmotionCssEditor }
