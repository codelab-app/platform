import React from 'react'
import { buttonData, buttonEvalData } from './Button.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Button',
  parameters: {
    data: {
      Default: buttonData,
      EvalButton: buttonEvalData,
    },
  },
}

export const Default = () => {
  const Button = Renderer.components(buttonData)

  return <Button />
}

export const EvalButton = () => {
  const Button = Renderer.components(buttonEvalData)

  return <Button />
}
