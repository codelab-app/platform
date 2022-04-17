import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { WithStoreResourceService } from '../../../store'

export const AddResourceButton = observer<WithStoreResourceService>(
  ({ storeResourceService }) => (
    <Button
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => storeResourceService.createModal.open()}
      size="small"
      type="primary"
    />
  ),
)
