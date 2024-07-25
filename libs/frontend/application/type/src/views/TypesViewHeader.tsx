import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend/infra/mobx'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const TypesViewHeader = observer(() => {
  const { fieldService, typeService } = useStore()
  const typeToUpdate = typeService.updateForm.type?.name || ''
  const fieldToUpdate = fieldService.updateForm.field?.key || ''

  const typeOrField = typeService.updateForm.isOpen
    ? 'type'
    : fieldService.updateForm.isOpen
    ? 'field'
    : ''

  const typeOrFieldName = typeService.updateForm.isOpen
    ? typeToUpdate
    : fieldToUpdate

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[
            { title: 'Types' },
            { title: typeOrField },
            { title: typeOrFieldName },
          ]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
    />
  )
})
