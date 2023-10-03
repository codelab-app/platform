import * as MuiIcons from '@mui/icons-material'
import type { IconProps } from '@mui/material/Icon'
import type { ReactElement } from 'react'
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
    MuiIcons[name as keyof typeof MuiIcons] as (
      props: IconProps,
    ) => ReactElement,
    props,
  )
}
