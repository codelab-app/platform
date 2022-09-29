import { BuilderDndType, IBuilderComponent } from '@codelab/frontend/abstract/core'
import { Card } from 'antd'
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
      css={tw`m-1 mb-6 mr-6 cursor-pointer`}
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
  <Card
    className={className}
    css={tw`mr-16`}
    hoverable
    title={<b>{component.name}</b>}
  >
    <img alt="" src={component.icon || '/codelab-logo-default.svg'} />
  </Card>
)
