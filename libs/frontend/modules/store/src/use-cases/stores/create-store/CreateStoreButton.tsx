import { PlusOutlined } from '@ant-design/icons'
import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateStoreButton = observer<WithServices<STORE_SERVICE>>(
  ({ storeService }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => storeService.createModal.open()}
        size="small"
        type="primary"
      />
    )
  },
)
