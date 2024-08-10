'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { GetTypeReferences } from '@codelab/frontend-domain-type/repositories'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  emptyJsonSchema,
  type EmptyJsonSchemaType,
} from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useTypeService } from '../../services'
import { useDeleteTypeModal } from './delete-type.state'

export const DeleteTypeModal = observer(() => {
  const typeService = useTypeService()
  const deleteTypeModal = useDeleteTypeModal()
  const closeModal = () => deleteTypeModal.close()
  const typeToDelete = deleteTypeModal.data

  const onSubmit = async () => {
    if (!typeToDelete?.kind) {
      throw new Error('useDeleteTypeForm: TypeKind is not defined')
    }

    // Make sure this type is not referenced anywhere else or the data may become corrupt
    const { getTypeReferences } = await GetTypeReferences({
      typeId: typeToDelete.id,
    })

    if (getTypeReferences?.length) {
      const allRefs = getTypeReferences.map(
        (typeRef) => `${typeRef.name} (${typeRef.label})`,
      )

      const label = Array.from(new Set(allRefs)).join(', ')

      throw new Error(`Can't delete typed since it's referenced in ${label}`)
    }

    await typeService.remove([typeToDelete])

    /**
     * typeService.delete writes into cache
     * if modal is opened -> bug: modal input values are cleared
     *
     * void = execute typeService.queryGetTypesTableTypes, close modal, and not wait until it finished
     */
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={deleteTypeModal.isOpen}
      title={<span className="font-semibold">Delete type</span>}
      uiKey={UiKey.DeleteTypeModal}
    >
      <ModalForm.Form<EmptyJsonSchemaType>
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting type',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete type "{typeToDelete?.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
