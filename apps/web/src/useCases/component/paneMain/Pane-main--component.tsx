import { css } from '@emotion/react'
import { VertexType } from '@prisma/client'
import { List } from 'antd'
import React, { useMemo } from 'react'
import { ComponentItem } from './Component-item'
import { PaneMainTemplate } from 'apps/web/src/templates/Pane-main--template'

export type ComponentItemType = {
  key: string
  type: VertexType
  label: string
}

export const PaneMainComponent = () => {
  const componentsData: Array<ComponentItemType> = useMemo(
    () =>
      Object.entries(VertexType)
        // Get only top level components, use naming convention of `_` to differentiate
        .filter(([, value]) => {
          const matchCount = (value.match(/_/g) ?? []).length

          return matchCount <= 1
        })
        // Produce readable label
        .map(([key, value]) => {
          const label = value.replace('React_', '').replace('_', ' ')

          return {
            key,
            type: value,
            label,
          }
        }),
    [],
  )

  // if (loading) {
  //   return null
  // }

  return (
    <PaneMainTemplate title="Component" header={<></>}>
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
