import * as AntdIcons from '@ant-design/icons'
import { IconProps } from '@ant-design/icons/lib/components/IconBase'
import React from 'react'

type _IconProps = IconProps & {
  /**
   * Name of destructured icon to use
   */
  name: string
}

export const AntdIcon = ({ name, ...props }: _IconProps) => {
  if (!name) {
    return null
  }

  return React.createElement(
    AntdIcons[name as keyof typeof AntdIcons] as any,
    props,
  )
}
