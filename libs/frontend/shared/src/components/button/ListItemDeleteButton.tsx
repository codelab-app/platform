import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'

export interface ListItemDeleteButtonProps {
  onClick: () => void
}

export const ListItemDeleteButton = ({
  onClick,
}: ListItemDeleteButtonProps) => {
  return <DeleteOutlined title="Delete" onClick={onClick} />
}
