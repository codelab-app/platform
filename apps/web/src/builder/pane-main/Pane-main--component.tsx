import { PictureOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { VertexType } from '@prisma/client'
import { Card, List, Space } from 'antd'
import React from 'react'
import Draggable from 'react-draggable'

type ComponentItem = {
  key: string
  type: VertexType
  label: string
}

export const PaneMainComponent = () => {
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
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            // position={null}
            grid={[25, 25]}
            scale={1}
            onStart={() => {
              //
            }}
            onDrag={() => {
              //
            }}
            onStop={() => {
              //
            }}
          >
            <Card
              style={{
                borderRadius: 0,
                minHeight: '120px',
              }}
              className="handle"
              css={css({
                backgroundColor: 'hotpink',
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
