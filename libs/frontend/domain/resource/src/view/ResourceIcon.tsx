import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import type { IResourceType } from '@codelab/shared/abstract/core'
import React from 'react'
import { icons } from '../icons'

interface ResourceIconProps extends Partial<CustomIconComponentProps> {
  add?: boolean
  type: IResourceType
}

export const ResourceIcon = ({ add, type, ...props }: ResourceIconProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon component={add ? icons.add[type] : icons[type]} {...props} />
)
