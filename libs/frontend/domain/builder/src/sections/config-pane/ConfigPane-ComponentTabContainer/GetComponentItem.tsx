import {
  BuilderDndType,
  IBuilderComponent,
} from '@codelab/frontend/abstract/core'
import { antDesignIconPrefix } from '@codelab/shared/data'
import { Card, Col, Row, Typography } from 'antd'
import React, { useMemo } from 'react'
import tw from 'twin.macro'
import { useCreateElementDraggable } from '../../../dnd/useCreateElementDraggable'

interface DraggableGetComponentItemProps {
  component: IBuilderComponent
}

export const DraggableGetComponentItem = ({
  component,
}: DraggableGetComponentItemProps) => {
  const createElementInput = useMemo(() => {
    return {
      name: component.name,
      atomId: component.id,
    }
  }, [component])

  const { attributes, listeners, setNodeRef } = useCreateElementDraggable({
    id: component.id,
    createElementInput,
    component,
    overlayRenderer: () => (
      <GetComponentItem component={component} tw="opacity-40" />
    ),
    type: BuilderDndType.CreateElement,
  })

  return (
    <div
      ref={setNodeRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...listeners}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...attributes}
      css={tw`m-1 mb-6 cursor-pointer`}
    >
      <GetComponentItem component={component} />
    </div>
  )
}

interface GetComponentItemProps {
  component: Pick<IBuilderComponent, 'icon' | 'name'>
  className?: string
}

export const GetComponentItem = ({
  component,
  className = '',
}: GetComponentItemProps) => (
  <Card hoverable>
    <Row align="middle" justify="space-between">
      <Col span={16}>
        <Row>
          <Col span={24}>
            <Typography.Text ellipsis strong>
              {component.name}
            </Typography.Text>
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Row>
          <Col span={24}>
            <img
              alt=""
              css={tw`flex-1 border border-black [max-width:70px] [max-height:70px]`}
              src={
                component.icon
                  ? `/${antDesignIconPrefix}/${component.icon}.svg`
                  : '/codelab-logo-default.svg'
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  </Card>
)
