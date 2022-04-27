import { PlusOutlined } from '@ant-design/icons'
import {
  OPERATION_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateOperationButton = observer<WithServices<OPERATION_SERVICE>>(
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
