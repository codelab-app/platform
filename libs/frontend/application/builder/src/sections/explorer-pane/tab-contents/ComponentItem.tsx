import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import type {
  IAtomModel,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import { isComponent } from '@codelab/frontend/abstract/domain'
import { Button, Card } from 'antd'
import Tooltip from 'antd/lib/tooltip'
import classNames from 'classnames'
import React from 'react'

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
        <img alt="" className="w-full" draggable="false" src={src} />
      </Card>
    </div>
  )
}
