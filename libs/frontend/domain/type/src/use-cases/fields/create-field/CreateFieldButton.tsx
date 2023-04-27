import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import type { InterfaceType } from '../../../store'
import { typeRef } from '../../../store'

export const CreateFieldButton = observer<{ interfaceId: string }>(
  ({ interfaceId }) => {
    const { fieldService } = useStore()

    const onClick = () => {
      fieldService.createModal.open(typeRef(interfaceId) as Ref<InterfaceType>)
    }

    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={onClick}
        size="small"
      >
        Field
      </Button>
    )
  },
)
