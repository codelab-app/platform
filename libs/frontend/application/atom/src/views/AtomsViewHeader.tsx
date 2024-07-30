import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { useUpdateFieldForm } from '@codelab/frontend-application-type/use-cases/update-field'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useUpdateAtomModal } from '../use-cases/update-atom/update-atom.state'

export const AtomsViewHeader = observer(() => {
  const updateFieldForm = useUpdateFieldForm()
  const updateAtomForm = useUpdateAtomModal()
  const atomToUpdate = updateAtomForm.data?.current.name || ''
  const fieldToUpdate = updateFieldForm.data?.current.key || ''

  const atomOrField = updateAtomForm.isOpen
    ? 'atom'
    : updateFieldForm.isOpen
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
