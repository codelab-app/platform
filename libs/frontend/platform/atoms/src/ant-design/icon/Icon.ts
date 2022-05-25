import * as AntdIcon from '@ant-design/icons'
import { IconProps } from '@ant-design/icons/lib/components/IconBase'
import React from 'react'

type _IconProps = IconProps & {
  /**
   * Name of destructured icon to use
   */
  name: string
}

export const Icon = ({ name, ...props }: _IconProps) => {
  if (!name) {
    return null
  }

  return React.createElement(
    AntdIcon[name as keyof typeof AntdIcon] as any,
    props,
  )
}
