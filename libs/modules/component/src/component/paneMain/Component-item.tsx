import { PictureOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Card, Space } from 'antd'
import { CardProps } from 'antd/lib/card'
import React from 'react'
import { useRecoilState } from 'recoil'
import { componentItemState } from './Component-item--state'
import { ComponentItemType } from './Pane-main--component'
import { useDrag } from 'react-dnd'
// import {
//   elementsPropTransformers,
//   elementTypeMap,
//   useComponentHandlers,
// } from '@codelab/frontend/builder'

interface ComponentItemProps extends CardProps {
  item: ComponentItemType
}

export const COMPONENT_ITEM_DRAG_TYPE = 'ComponentItem'

export const ComponentItem = ({
  item,
  style,
  className,
  ...props
}: ComponentItemProps) => {
  const [, setState] = useRecoilState(componentItemState)
  // const handlers = useComponentHandlers()
  const [, drag] = useDrag({ item, type: COMPONENT_ITEM_DRAG_TYPE }, [item])

  return (
    <div>
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
        <div
          onDragStart={() => {
            setState({
              isDraggingComponent: true,
            })
          }}
          onDragEnd={() => {
            setState({
              isDraggingComponent: false,
            })
          }}
          ref={drag}
        >
          <Space
            direction="vertical"
            align="center"
            style={{ width: '100%', textAlign: 'center' }}
          >
            <PictureOutlined style={{ fontSize: '30px' }} />
            <span style={{ fontSize: '12px' }}>{item.label}</span>
          </Space>
        </div>
      </Card>
    </div>
  )
}

ComponentItem.whyDidItRender = true
