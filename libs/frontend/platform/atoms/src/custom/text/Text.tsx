import type { IPropData } from '@codelab/frontend/abstract/core'
import type { ListProps } from 'antd'
import { List as AntList } from 'antd'
import React from 'react'

export const Text = (props: IPropData) => {
  return React.createElement('div', props)
}

export const List = ({
  // We treat all UI as same type
  renderItem,
  ...props
}: ListProps<unknown>) => {
  return React.createElement(AntList, {
    ...props,
    renderItem,
  })
}

Text.displayName = 'Text'
