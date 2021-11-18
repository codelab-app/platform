import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import tw from 'twin.macro'
import { typeActions } from '../../../store/typeState'

export const CreateTypeButton = () => {
  const dispatch = useDispatch()
  const openCreateModal = () => dispatch(typeActions.openCreateModal())

  return (
    <Button
      size="small"
      type="primary"
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
    />
  )
}
