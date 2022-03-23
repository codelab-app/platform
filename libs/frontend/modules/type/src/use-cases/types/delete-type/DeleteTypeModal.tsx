import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  ModalForm,
} from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { typeApi, TypeService, WithTypeService } from '../../../store'

export const DeleteTypeModal = observer<WithTypeService>(({ typeService }) => {
  const closeModal = () => typeService.deleteModal.close()
  const deletedType = typeService.deleteModal.type

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Delete type</span>}
      visible={typeService.deleteModal.isOpen}
    >
      <ModalForm.Form<EmptyJsonSchemaType>
        model={{}}
        onSubmit={async () => {
          const kind = deletedType?.typeKind

          if (!kind) {
            throw new Error('useDeleteTypeForm: TypeKind is not defined')
          }

          // Make sure this type is not referenced anywhere else or the data may become corrupt
          const { getTypeReferences } = await typeApi.GetTypeReferences({
            typeId: deletedType.id,
          })

          if (getTypeReferences?.length) {
            const allRefs = getTypeReferences.map(
              (r) => `${r.name} (${r.label})`,
            )

            const label = Array.from(new Set(allRefs)).join(', ')

            throw new Error(
              `Can't delete typed since it's referenced in ${label}`,
            )
          }

          return typeService.delete(deletedType.id)
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while deleting type',
          type: 'error',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete type "{deletedType?.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
