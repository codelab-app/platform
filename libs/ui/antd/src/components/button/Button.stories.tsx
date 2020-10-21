import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { buttonData } from '..'
import { fragmentWrappedButtonData } from './Button.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Button',
}

export const Default = () => {
  const Button = Renderer.components(fragmentWrappedButtonData)

  return <Button />
}

export const OverrideInternalPropsWithExternal = () => {
  const Button = Renderer.components<ButtonProps>(buttonData)

  return <Button type="dashed" />
}
