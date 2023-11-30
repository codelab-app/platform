import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import type {
  IAtomModel,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import { Button, Card } from 'antd'
import Tooltip from 'antd/lib/tooltip'
import classNames from 'classnames'
import React from 'react'
import { ComponentIcon } from './ComponentIcon'

interface ComponentItemProps {
  className?: string
  component: IAtomModel | IComponentModel
  selected?: boolean
  onDelete?(id: string): void
  onEdit?(id: string): void
  onExport?(id: string): void
  onSelect?(id: string): void
}

export const ComponentItem = ({
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
    <div className="cursor-pointer">
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
        <ComponentIcon component={component} />
      </Card>
    </div>
  )
}
