import { IPropData } from '@codelab/frontend/abstract/core'
import { List as AntList, ListProps } from 'antd'
import React from 'react'

export const Text = (props: IPropData) => {
  return React.createElement('div', props)
}

export const List = ({
  // We treat all UI as same type
  renderItem,
  ...props
}: ListProps<any>) => {
  // We'll do our conversion here, we can be specfic because we know which type it needs to be
  const _renderItem = renderItem

  return React.createElement(AntList, {
    ...props,
    renderItem: _renderItem,
  } as any)
}

Text.displayName = 'Text'
