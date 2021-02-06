import { css } from '@emotion/react'
import { VertexType } from '@prisma/client'
import { List } from 'antd'
import React, { useMemo } from 'react'
import { ComponentItem } from './Component-item'

type ComponentItem = {
  key: string
  type: VertexType
  label: string
}

export const PaneMainComponent = () => {
  // const { position, onStart, onDrag, onStop, loading } = useComponent()

  // const onStartCb = useCallback(onStart, [])
  // const onStopCb = useCallback(onStop, [0])

  const componentsData: Array<ComponentItem> = useMemo(
    () =>
      Object.entries(VertexType)
        // Get only top level components, use naming convention of `_` to differentiate
        .filter(([key, value]) => {
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
          <ComponentItem
            item={item}
            // onStart={onStart}
            // onStop={onStopCb}
            // onDrag={onDrag}
          />
        </List.Item>
      )}
    />
  )
}
