import { PlusOutlined } from '@ant-design/icons'
import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const AddResourceButton = observer<WithServices<RESOURCE_SERVICE>>(
  ({ resourceService }) => (
    <Button
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => resourceService.createModal.open()}
      type="primary"
    >
      Add Resource
    </Button>
  ),
)
