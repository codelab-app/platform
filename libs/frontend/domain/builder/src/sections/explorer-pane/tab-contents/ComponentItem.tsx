import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { IAtom, IComponent } from '@codelab/frontend/abstract/core'
import {
  BuilderDndType,
  isComponentModel,
  isComponentPageNode,
} from '@codelab/frontend/abstract/core'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { Button, Card } from 'antd'
import Tooltip from 'antd/lib/tooltip'
import React, { useMemo } from 'react'
import tw from 'twin.macro'
import { useCreateElementDraggable } from '../../../dnd/useCreateElementDraggable'

interface DraggableComponentItemProps {
  component: IAtom | IComponent
  onDelete?(id: string): void
  onEdit?(id: string): void
}

export const DraggableComponentItem = ({
  component,
  onDelete,
  onEdit,
}: DraggableComponentItemProps) => {
  const createElementInput = useMemo(() => {
    return {
      name: compoundCaseToTitleCase(component.name),
      renderType: {
        id: component.id,
        kind: isComponentPageNode(component as IComponent)
          ? IRenderTypeKind.Component
          : IRenderTypeKind.Atom,
      },
    }
  }, [component])

  const { attributes, listeners, setNodeRef } = useCreateElementDraggable({
    component,
    createElementInput,
    id: component.id,
    overlayRenderer: () => (
      <ComponentItem
        component={component}
        onDelete={onDelete}
        onEdit={onEdit}
        tw="opacity-40"
      />
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
      css={tw`cursor-pointer [max-width: 300px]`}
    >
      <ComponentItem
        component={component}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  )
}

interface ComponentItemProps {
  component: IAtom | IComponent
  onDelete?(id: string): void
  onEdit?(id: string): void
}

export const antDesignIconPrefix = 'assets/atoms/antd'

export const ComponentItem = ({
  component,
  onDelete,
  onEdit,
}: ComponentItemProps) => {
  const title = (
    <Tooltip placement="left" title={component.name}>
      <b css={tw`text-sm`}>{component.name}</b>
    </Tooltip>
  )

  // TODO: update this once we show snapshots for custom components as well
  const isCustomComponent = isComponentModel(component)

  const src =
    !isCustomComponent && component.icon
      ? `/${antDesignIconPrefix}/${component.icon}.svg`
      : '/codelab-logo-default.svg'

  return (
    <Card
      extra={
        <>
          {onEdit ? (
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(component.id)}
              type="text"
            />
          ) : (
            ''
          )}
          {onDelete ? (
            <Button
              danger
              hidden={!onDelete}
              icon={<DeleteOutlined />}
              onClick={() => onDelete(component.id)}
              type="text"
            />
          ) : (
            ''
          )}
        </>
      }
      hoverable
      title={title}
    >
      <img alt="" css={tw`w-full`} src={src} />
    </Card>
  )
}
