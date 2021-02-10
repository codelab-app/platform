import { PictureOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Card, Space } from 'antd'
import { CardProps } from 'antd/lib/card'
import React from 'react'
import { useDrag } from 'react-dnd'
import { DragAndDropTypes } from '@codelab/frontend'

interface ComponentItemProps extends CardProps {
  item: any
}

export const ComponentItem = ({
  item,
  style,
  className,
  ...props
}: ComponentItemProps) => {
  const [, dragRef] = useDrag({
    item: { type: DragAndDropTypes.Component, node: item },
  })

  return (
    <div ref={dragRef}>
      <Card
        style={{
          borderRadius: 0,
          minHeight: '120px',
          ...(style || {}),
        }}
        className={`handle${className || ''}`}
        css={css({
          ':hover': {
            cursor: 'move',
          },
        })}
        {...props}
      >
        <Space
          direction="vertical"
          align="center"
          style={{ width: '100%', textAlign: 'center' }}
        >
          <PictureOutlined style={{ fontSize: '30px' }} />
          <span style={{ fontSize: '12px' }}>{item.label}</span>
        </Space>
      </Card>
    </div>
  )
}

ComponentItem.whyDidItRender = true
