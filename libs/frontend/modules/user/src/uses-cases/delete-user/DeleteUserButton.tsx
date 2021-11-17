import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { userActions, UserStateDeletePayload } from '../../store/userState'

export interface DeleteUserButtonProps {
  payload: UserStateDeletePayload
}

export const DeleteUserButton = ({ payload }: DeleteUserButtonProps) => {
  const dispatch = useDispatch()
  const openDeleteModal = () => dispatch(userActions.openDeleteModal(payload))

  return (
    <Button
      size="small"
      danger
      icon={<DeleteOutlined />}
      onClick={() => openDeleteModal()}
    />
  )
}
