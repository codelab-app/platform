import { PlusOutlined } from '@ant-design/icons'
import type { IFieldService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import type { InterfaceType } from '../../../store'
import { typeRef } from '../../../store'

export interface CreateFieldButtonProps {
  fieldService: IFieldService
  interfaceId?: string
}

export const CreateFieldButton = observer<CreateFieldButtonProps>(
  ({ fieldService, interfaceId }) => {
    return interfaceId ? (
      <Button
        css={tw`flex justify-center items-center`}
        icon={<PlusOutlined />}
        onClick={(event) => {
          event.stopPropagation()
          fieldService.createModal.open(
            typeRef(interfaceId) as Ref<InterfaceType>,
          )
        }}
        size="small"
      >
        Field
      </Button>
    ) : null
  },
)
