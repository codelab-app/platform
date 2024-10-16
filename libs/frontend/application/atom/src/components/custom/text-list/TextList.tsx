import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ListProps } from 'antd/lib/list'

import List from 'antd/lib/list'

/**
 * Wrapper for {@link List} that renders the items as plain text
 */
export const TextList = (props: ListProps<ObjectLike>) => (
  <List
    renderItem={(item) => <List.Item>{item.toString()}</List.Item>}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)
