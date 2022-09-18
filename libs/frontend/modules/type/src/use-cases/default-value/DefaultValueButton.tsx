import { FormOutlined } from '@ant-design/icons'
import { IInterfaceType, ITypeService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { Ref } from 'mobx-keystone'
import React from 'react'
import { typeRef } from '../../store'

export interface DefaultValueButtonProps {
  interfaceId: string
  typeService: ITypeService
}

export const DefaultValueButton = ({
  interfaceId,
  typeService,
}: DefaultValueButtonProps) => (
  <Button
    icon={<FormOutlined />}
    onClick={() => {
      typeService.interfaceDefaultsModal.open(
        typeRef(interfaceId) as Ref<IInterfaceType>,
      )
    }}
    size="small"
  />
)
