import { css } from '@emotion/react'
import { List } from 'antd'
import React, { useMemo } from 'react'
import { ComponentItem } from './Component-item'
import { AtomType } from '@codelab/frontend/shared'
import { PaneMainTemplate } from '@codelab/frontend/layout'

export type ComponentItemType = {
  key: string
  type: AtomType
  label: string
}

export const PaneMainComponent = () => {
  const componentsData: Array<ComponentItemType> = useMemo(
    () => [],
    // Object.entries(AtomType)
    //   // Get only top level components, use naming convention of `_` to differentiate
    //   .filter(([, value]) => {
    //     const matchCount = (value.match(/_/g) ?? []).length

    //     return matchCount <= 1
    //   })
    //   // Produce readable label
    //   .map(([key, value]) => {
    //     const label = value.replace('React_', '').replace('_', ' ')

    //     return {
    //       key,
    //       type: value,
    //       label,
    //     }
    //   }),
    [],
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
