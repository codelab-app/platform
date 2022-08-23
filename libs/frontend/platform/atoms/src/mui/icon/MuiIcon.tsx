import * as MuiIcons from '@mui/icons-material'
import { IconProps } from '@mui/material/Icon'
import React from 'react'

interface MuiIconProp extends IconProps {
  /**
   * Name of destructured icon to use
   */
  name: string
}

export const MuiIcon = ({ name, ...props }: MuiIconProp) => {
  if (!name) {
    return null
  }

  return React.createElement(
    MuiIcons[name as keyof typeof MuiIcons] as any,
    props,
  )
}
