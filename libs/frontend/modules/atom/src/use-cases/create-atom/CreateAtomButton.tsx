import { PlusOutlined } from '@ant-design/icons'
import { ATOM_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const CreateAtomButton = observer<WithServices<ATOM_SERVICE>>(
  ({ atomService }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() => atomService.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
