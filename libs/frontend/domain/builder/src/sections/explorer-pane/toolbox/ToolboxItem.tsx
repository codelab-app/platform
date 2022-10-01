import { DragOutlined } from '@ant-design/icons'
import { ICreateElementDTO } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useCreateElementDraggable } from '../../../dnd/useCreateElementDraggable'

export interface ToolboxItemProps {
  id: string
  name: string
  createElementInputFactory: () => Omit<
    ICreateElementDTO,
    'parentElementId' | 'order' | 'owner'
  >
}

export const ToolboxItem = ({
  toolboxItem,
}: {
  toolboxItem: ToolboxItemProps
}) => {
  const { attributes, listeners, setNodeRef } = useCreateElementDraggable(
    toolboxItem.id,
    toolboxItem.createElementInputFactory(),
    toolboxItem,
  )

  return (
    <div css={tw`border-gray-300 p-2 border flex items-center justify-between`}>
      <span>{toolboxItem.name}</span>

      <Button
        ref={setNodeRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...listeners}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...attributes}
        icon={<DragOutlined />}
        size="small"
      />
    </div>
  )
}
