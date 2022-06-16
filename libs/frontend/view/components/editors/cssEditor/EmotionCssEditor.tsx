import { css, cssCompletionSource } from '@codemirror/lang-css'
import { CodeMirrorInput } from '../CodeMirror/CodeMirrorInput'
import { CodeMirrorInputProps } from '../CodeMirror/types'

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
