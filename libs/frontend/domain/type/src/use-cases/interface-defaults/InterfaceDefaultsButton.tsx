import { FormOutlined } from '@ant-design/icons'
import { IInterfaceType, ITypeService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { Ref } from 'mobx-keystone'
import React from 'react'
import { typeRef } from '../../store'

export interface InterfaceDefaultsButtonProps {
  interfaceId: string
  typeService: ITypeService
}

export const InterfaceDefaultsButton = ({
  interfaceId,
  typeService,
}: InterfaceDefaultsButtonProps) => {
  const type = typeService.type(interfaceId) as IInterfaceType

  return (
    <Button
      disabled={!type.fields.length}
      icon={<FormOutlined />}
      onClick={() => {
        typeService.interfaceDefaultsModal.open(
          typeRef(interfaceId) as Ref<IInterfaceType>,
        )
      }}
      size="small"
    />
  )
}
