import List, { ListProps } from 'antd/lib/list'

/**
 * Wrapper for {@link List} that renders the items as plain text
 */
export const TextList = (props: ListProps<any>) => (
  <List
    renderItem={(item) => <List.Item>{item.toString()}</List.Item>}
    {...props}
  />
)
