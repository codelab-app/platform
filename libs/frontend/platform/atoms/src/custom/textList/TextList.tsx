import List, { ListProps } from 'antd/lib/list'
import React from 'react'

/**
 * Wrapper for {@link List} that renders the items as plain text
 */
export const TextList = (props: ListProps<object>) => (
  <List
    renderItem={(item) => <List.Item>{item.toString()}</List.Item>}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)
