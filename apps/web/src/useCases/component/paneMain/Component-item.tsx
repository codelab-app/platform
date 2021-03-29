import { PictureOutlined } from '@ant-design/icons'
import { useEditor } from '@craftjs/core'
import { css } from '@emotion/react'
import { Card, Space } from 'antd'
import { CardProps } from 'antd/lib/card'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useComponentHandlers } from '../../../../../../libs/frontend/src/renderer/Renderer-components'
import { elementsPropTransformers } from '../../../../../../libs/frontend/src/renderer/elementFactory'
import { componentItemState } from './Component-item--state'
import { ComponentItemType } from './Pane-main--component'
import { elementTypeMap } from '@codelab/frontend/shared'

interface ComponentItemProps extends CardProps {
  item: ComponentItemType
}

export const ComponentItem = ({
  item,
  style,
  className,
  ...props
}: ComponentItemProps) => {
  const {
    connectors: { create },
  } = useEditor()

  const [, setState] = useRecoilState(componentItemState)
  const handlers = useComponentHandlers()

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
          ref={(ref) => {
            const Component = elementTypeMap[item.type]

            if (!Component) {
              return null
            }

            const pt = elementsPropTransformers[item.type]
            let p = {}

            if (pt) {
              p = pt({
                handlers,
                node: {
                  type: item.type,
                } as any,
                props: {},
              })
            }

            return create(ref, <Component {...p} />)
          }}
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
