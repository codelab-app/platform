import { css } from '@emotion/react'
import { List } from 'antd'
import React, { useMemo } from 'react'
import { ComponentItem } from './Component-item'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { useGetComponentsQuery } from '@codelab/hasura'

export type ComponentItemType = {
  key: string
  label: string
}

export const PaneMainComponent = () => {
  const { data: components } = useGetComponentsQuery()

  const componentsData: Array<ComponentItemType> | undefined = useMemo(
    () =>
      components?.component.map((component) => ({
        key: component.id,
        label: component.label,
      })),
    [components, components?.component],
  )

  return (
    <PaneMainTemplate title="Component">
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
    </PaneMainTemplate>
  )
}
