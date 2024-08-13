'use client'

import {
  UpdateFieldForm,
  useUpdateFieldModal,
} from '@codelab/frontend-application-type/use-cases/update-field'
import { Empty, Typography } from 'antd'
import React from 'react'
import { UpdateAtomForm } from '../update-atom'
import { useUpdateAtomModal } from '../update-atom/update-atom.state'

export const AtomForm = () => {
  const updateAtomForm = useUpdateAtomModal()
  const updateFieldForm = useUpdateFieldModal()

  const formLabel = updateAtomForm.isOpen
    ? 'Edit Atom'
    : updateFieldForm.isOpen
    ? 'Edit Field'
    : null

  const atomStory = updateAtomForm.isOpen ? (
    <>
      <Typography className="text-2xl">Examples</Typography>
      <div className="flex grow flex-col justify-center">
        <Empty></Empty>
      </div>
    </>
  ) : null

  return (
    <div className="flex size-full flex-col overflow-auto">
      {atomStory}

      <Typography className="text-2xl">{formLabel}</Typography>
      {updateAtomForm.isOpen && <UpdateAtomForm />}
      {updateFieldForm.isOpen && <UpdateFieldForm />}
    </div>
  )
}
