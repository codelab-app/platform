import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input/TextArea'
import React from 'react'

export type EmotionCssEditorProps = TextAreaProps

const { TextArea } = Input

const EmotionCssEditor = (props: EmotionCssEditorProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TextArea {...props} />
}

EmotionCssEditor.displayName = 'EmotionCssEditor'

export { EmotionCssEditor }
