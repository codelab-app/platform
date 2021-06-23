import { useGetComponentsQuery } from '@codelab/codegen/hasura'
import { ComponentItemType } from '@codelab/frontend/shared'
import { css } from '@emotion/react'
import { List } from 'antd'
import React, { useMemo } from 'react'
import { ComponentItem } from '../paneMain'

export const GetComponentsList = () => {
  const { data: components } = useGetComponentsQuery()

  const componentsData: Array<ComponentItemType> | undefined = useMemo(
    () =>
      components?.component.map((component) => ({
        key: component.id,
        label: component.label,
        id: component.id,
      })),
    [components, components?.component],
  )

  return (
    <List
      grid={{
        gutter: 0,
        column: 2,
      }}
      dataSource={componentsData}
      bordered
      renderItem={(item) => (
        <List.Item
          css={css({
            '.react-draggable-dragging': {
              visibility: 'visible',
              backgroundColor: 'pink',
            },
          })}
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          <ComponentItem item={item} />
        </List.Item>
      )}
    />
  )
}
