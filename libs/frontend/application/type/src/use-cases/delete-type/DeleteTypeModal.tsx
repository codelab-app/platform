'use client'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import {
  emptyJsonSchema,
  type EmptyJsonSchemaType,
} from '@codelab/frontend-presentation-components-form/schema'
import { findTypeServerActions } from '@codelab/shared-domain-module/type'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useTypeService } from '../../services'

const { GetTypeReferences } = findTypeServerActions

export const DeleteTypeModal = observer<{ id: string }>(({ id }) => {
  const typeService = useTypeService()
  const router = useRouter()
  const closeModal = () => router.push(PageType.Type())
  const type = useTypeService().getOneFromCache({ id })

  if (!type) {
    return null
  }

  const onSubmit = async () => {
    // Make sure this type is not referenced anywhere else or the data may become corrupt

    const { getTypeReferences } = await GetTypeReferences({
      typeId: type.id,
    })

    if (getTypeReferences?.length) {
      const allRefs = getTypeReferences.map(
        (typeRef) => `${typeRef.name} (${typeRef.label})`,
      )

      const label = Array.from(new Set(allRefs)).join(', ')

      throw new Error(`Can't delete typed since it's referenced in ${label}`)
    }

    await typeService.removeMany([type])
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={true}
      title={<span className="font-semibold">Delete type</span>}
      uiKey={UiKey.TypeModalDelete}
    >
      <ModalForm.Form<EmptyJsonSchemaType>
        errorMessage="Error while deleting type"
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete type "{type.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
