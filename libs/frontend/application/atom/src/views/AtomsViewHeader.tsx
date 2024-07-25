import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useUpdateAtomModal } from '../use-cases/update-atom/update-atom.state'

export const AtomsViewHeader = observer(() => {
  const { fieldService } = useStore()
  const updateAtomForm = useUpdateAtomModal()
  const atomToUpdate = updateAtomForm.data?.current.name || ''
  const fieldToUpdate = fieldService.updateForm.field?.key || ''

  const atomOrField = updateAtomForm.isOpen
    ? 'atom'
    : fieldService.updateForm.isOpen
    ? 'field'
    : ''

  const atomOrFieldName = updateAtomForm.isOpen ? atomToUpdate : fieldToUpdate

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
