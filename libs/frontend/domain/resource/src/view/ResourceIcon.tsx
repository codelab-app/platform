import Icon from '@ant-design/icons'
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { IResourceType } from '@codelab/frontend/abstract/core'
import React from 'react'
import { icons } from '../icons'

interface ResourceIconProps extends Partial<CustomIconComponentProps> {
  type: IResourceType
}

export const ResourceIcon = ({ type, ...props }: ResourceIconProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon component={icons[type]} {...props} />
)
