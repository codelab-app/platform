import { PlusOutlined } from '@ant-design/icons'
import { IFieldService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { InterfaceType, typeRef } from '../../../store'

export interface CreateFieldButtonProps {
  interfaceId: string
  fieldService: IFieldService
}

export const CreateFieldButton = observer<CreateFieldButtonProps>(
  ({ interfaceId, fieldService }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() =>
          fieldService.createModal.open(
            typeRef(interfaceId) as Ref<InterfaceType>,
          )
        }
        size="small"
        type="primary"
      />
    )
  },
)
