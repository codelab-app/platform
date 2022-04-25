import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { WithOperationService } from '../../../store'

export const CreateOperationButton = observer<WithOperationService>(
  ({ operationService }) => (
    <Button
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => operationService.createModal.open()}
      size="small"
      type="primary"
    />
  ),
)
