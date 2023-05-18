import * as AntdIcons from '@ant-design/icons'
import type { IconProps } from '@ant-design/icons/lib/components/IconBase'
import type { ReactElement } from 'react'
import React from 'react'

type _IconProps = IconProps & {
  /**
   * Name of destructured icon to use
   */
  name: keyof typeof AntdIcons | null
}

export const AntdIcon = ({ name, ...props }: _IconProps) => {
  const icon = name && AntdIcons[name]

  if (!icon) {
    return null
  }

  return React.createElement(icon as (props: IconProps) => ReactElement, props)
}
