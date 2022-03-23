import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import {
  InterfaceType,
  typeRef,
  TypeService,
  WithTypeService,
} from '../../../store'

export type CreateFieldButtonProps = {
  interfaceId: string
} & WithTypeService

export const CreateFieldButton = observer<CreateFieldButtonProps>(
  ({ interfaceId, typeService }) => {
    return (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={() =>
          typeService.fieldCreateModal.open(
            typeRef(interfaceId) as Ref<InterfaceType>,
          )
        }
        size="small"
        type="primary"
      />
    )
  },
)
