import { PlusOutlined } from '@ant-design/icons'
import { IDomainService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'

export const CreateDomainButton = observer<
  PropsWithChildren<{
    domainService: IDomainService
  }>
>(({ domainService, children }) => {
  const icon = !children && <PlusOutlined />

  const onClick = () => {
    domainService.createModal.open()
  }

  return (
    <Button icon={icon} onClick={onClick} type="primary">
      {children ?? 'Create Domain'}
    </Button>
  )
})
