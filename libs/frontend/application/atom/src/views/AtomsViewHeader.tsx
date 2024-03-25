import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const AtomsViewHeader = observer(() => {
  const { atomService, fieldService } = useStore()
  const atomToUpdate = atomService.updateForm.atom?.name || ''
  const fieldToUpdate = fieldService.updateForm.field?.key || ''

  const atomOrField = atomService.updateForm.isOpen
    ? 'atom'
    : fieldService.updateForm.isOpen
    ? 'field'
    : ''

  const atomOrFieldName = atomService.updateForm.isOpen
    ? atomToUpdate
    : fieldToUpdate

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[
            { title: 'Atoms' },
            { title: atomOrField },
            { title: atomOrFieldName },
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
