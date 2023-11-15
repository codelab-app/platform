import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import type {
  IAtomModel,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import { BuilderDndType, isComponent } from '@codelab/frontend/abstract/domain'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { Button, Card } from 'antd'
import Tooltip from 'antd/lib/tooltip'
import classNames from 'classnames'
import React, { useMemo } from 'react'
import { useCreateElementDraggable } from '../../../dnd/useCreateElementDraggable.hook'

interface DraggableComponentItemProps {
  component: IAtomModel | IComponentModel
  selected?: boolean
  onDelete?(id: string): void
  onEdit?(id: string): void
  onExport?(id: string): void
  onSelect?(id: string): void
}

export const DraggableComponentItem = ({
  component,
  onDelete,
  onEdit,
  onExport,
  onSelect,
  selected,
}: DraggableComponentItemProps) => {
  const createElementInput = useMemo(() => {
    return {
      name: compoundCaseToTitleCase(component.name),
      renderType: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __typename: isComponent(component as IComponentModel)
          ? IElementRenderTypeKind.Component
          : IElementRenderTypeKind.Atom,
        id: component.id,
      },
    }
  }, [component])

  const { attributes, listeners, setNodeRef } = useCreateElementDraggable({
    component,
    createElementInput,
    id: component.id,
    overlayRenderer: () => (
      <ComponentItem
        className="opacity-40"
        component={component}
        onDelete={onDelete}
        onEdit={onEdit}
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
      className="[max-width: 350px] cursor-pointer"
    >
      <ComponentItem
        component={component}
        onDelete={onDelete}
        onEdit={onEdit}
        onExport={onExport}
        onSelect={onSelect}
        selected={selected}
      />
    </div>
  )
}

interface ComponentItemProps {
  className?: string
  component: IAtomModel | IComponentModel
  selected?: boolean
  onDelete?(id: string): void
  onEdit?(id: string): void
  onExport?(id: string): void
  onSelect?(id: string): void
}

export const antDesignIconPrefix = 'assets/atoms/antd'

const ComponentItem = ({
  className,
  component,
  onDelete,
  onEdit,
  onExport,
  onSelect,
  selected,
}: ComponentItemProps) => {
  const title = (
    <Tooltip placement="left" title={component.name}>
      <b className="text-sm">{component.name}</b>
    </Tooltip>
  )

  // TODO: update this once we show snapshots for custom components as well
  const isCustomComponent = isComponent(component)

  const src =
    !isCustomComponent && component.icon
      ? `/${antDesignIconPrefix}/${component.icon}.svg`
      : '/codelab-logo-default.svg'

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onEdit && onEdit(component.id)
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onDelete && onDelete(component.id)
  }

  const handleExportClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onExport && onExport(component.id)
  }

  const handleSelectClick = () => {
    onSelect && onSelect(component.id)
  }

  return (
    <Card
      className={classNames(
        selected && 'border border-solid border-blue-400',
        className,
      )}
      extra={
        <>
          {onEdit ? (
            <Button
              icon={<EditOutlined />}
              onMouseDown={handleEditClick}
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
              onMouseDown={handleDeleteClick}
              type="text"
            />
          ) : (
            ''
          )}
          {onExport ? (
            <Button
              hidden={!onExport}
              icon={<ExportOutlined />}
              onMouseDown={handleExportClick}
              title="Export"
              type="text"
            />
          ) : (
            ''
          )}
        </>
      }
      hoverable
      onMouseDown={handleSelectClick}
      title={title}
    >
      <img alt="" className="w-full" src={src} />
    </Card>
  )
}
