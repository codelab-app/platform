import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { EntityType, useCrudModalForm } from '../modal'

interface CrudButtonOwnProps {
  entityType: EntityType
}

export type CrudButtonProps = Omit<ButtonProps, 'onClick'> & CrudButtonOwnProps

export const CrudButton = ({ entityType, ...props }: CrudButtonProps) => {
  const { openCreateModal } = useCrudModalForm(entityType)

  return <Button onClick={() => openCreateModal()} {...props} />
}

CrudButton.displayName = 'CrudButton'
