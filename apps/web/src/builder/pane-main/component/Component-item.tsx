import { PictureOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Card, Space } from 'antd'
import React from 'react'
import Draggable from 'react-draggable'

interface ComponentItemProps {
  item: any
  onStart?: any
  onDrag?: any
  onStop?: any
}

export const ComponentItem = ({
  item,
  onStart = () => null,
  onDrag = () => null,
  onStop = () => null,
}: ComponentItemProps) => {
  // const throttledOnDrag = useCallback(throttle(onDrag, 1000), [0])

  // console.log('rerender')

  return (
    <Draggable
      axis="both"
      bounds="#Builder"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      // position={position}
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
          <span style={{ fontSize: '12px' }}>{item.label}</span>
        </Space>
      </Card>
    </Draggable>
  )
}

ComponentItem.whyDidItRender = true
