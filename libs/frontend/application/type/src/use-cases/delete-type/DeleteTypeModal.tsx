import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend/infra/mobx'
import { typeApi } from '@codelab/frontend-domain-type/repositories'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  emptyJsonSchema,
  type EmptyJsonSchemaType,
} from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const DeleteTypeModal = observer(() => {
  const { typeService } = useStore()
  const closeModal = () => typeService.deleteModal.close()
  const typeToDelete = typeService.deleteModal.type

  const onSubmit = async () => {
    if (!typeToDelete?.kind) {
      throw new Error('useDeleteTypeForm: TypeKind is not defined')
    }

    // Make sure this type is not referenced anywhere else or the data may become corrupt
    const { getTypeReferences } = await typeApi.GetTypeReferences({
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
      open={typeService.deleteModal.isOpen}
      title={<span className="font-semibold">Delete type</span>}
    >
      <ModalForm.Form<EmptyJsonSchemaType>
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting type',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteType.key}
      >
        <h4>Are you sure you want to delete type "{typeToDelete?.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
