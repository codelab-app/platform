import { IconProps } from '@ant-design/icons/lib/components/IconBase'
import * as MuiIcons from '@mui/icons-material'
import React from 'react'

type _IconProps = IconProps & {
  /**
   * Name of destructured icon to use
   */
  name: string
}

export const MuiIcon = ({ name, ...props }: _IconProps) => {
  if (!name) {
    return null
  }

  return React.createElement(
    MuiIcons[name as keyof typeof MuiIcons] as any,
    props,
  )
}
