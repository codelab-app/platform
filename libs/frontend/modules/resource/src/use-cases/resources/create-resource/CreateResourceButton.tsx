import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { WithResourceService } from '../../../store'

export const CreateResourceButton = observer<WithResourceService>(
  ({ resourceService }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => resourceService.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
