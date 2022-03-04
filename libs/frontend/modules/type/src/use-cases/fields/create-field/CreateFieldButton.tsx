import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { InterfaceType, typeRef, TypeStore } from '../../../store'

export interface CreateFieldButtonProps {
  interfaceId: string
  typeStore: TypeStore
}

export const CreateFieldButton = observer<CreateFieldButtonProps>(
  ({ interfaceId, typeStore }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() =>
          typeStore.fieldCreateModal.open(
            typeRef(interfaceId) as Ref<InterfaceType>,
          )
        }
        size="small"
        type="primary"
      />
    )
  },
)
