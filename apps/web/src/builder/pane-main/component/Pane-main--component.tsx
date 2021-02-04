import { PictureOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { VertexType } from '@prisma/client'
import { Card, List, Space } from 'antd'
import React from 'react'
import Draggable from 'react-draggable'
import { useComponent } from './component-hook'

type ComponentItem = {
  key: string
  type: VertexType
  label: string
}

export const PaneMainComponentStyle = styled.div`
  visibility: ${({ visible }: { visible: boolean }) =>
    visible ? 'visible' : 'hidden'};
`

export const PaneMainComponent = () => {
  const { position, onStart, onDrag, onStop } = useComponent()

  const componentsData: Array<ComponentItem> = Object.entries(VertexType)
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
    })

  return (
    <List
      grid={{
        gutter: 0,
        column: 2,
      }}
      dataSource={componentsData}
      bordered
      renderItem={(componentItem) => (
        <List.Item style={{ padding: 0, margin: 0 }}>
          <Draggable
            axis="both"
            bounds="#Builder"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={position}
            grid={[1, 1]}
            scale={1}
            onStart={onStart}
            onDrag={onDrag}
            onStop={onStop}
          >
            <Card
              style={{
                borderRadius: 0,
                minHeight: '120px',
              }}
              className="handle"
              css={css({
                ':hover': {
                  cursor: 'move',
                },
              })}
            >
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <PictureOutlined style={{ fontSize: '30px' }} />
                <span style={{ fontSize: '12px' }}>{componentItem.label}</span>
              </Space>
            </Card>
          </Draggable>
        </List.Item>
      )}
    />
  )
}
