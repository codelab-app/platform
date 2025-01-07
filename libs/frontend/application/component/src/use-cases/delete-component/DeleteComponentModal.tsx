'use client'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useComponentService } from '../../services'

export const DeleteComponentModal = observer(({ id }: { id: string }) => {
  const router = useRouter()
  const componentService = useComponentService()
  const closeModal = () => router.push(PageType.Components())
  const component = componentService.getOneFromCache({ id })

  const onSubmit = async () => {
    if (!component) {
      return Promise.reject()
    }

    await componentService.removeMany([component])
  }

  return (
    <ModalForm.Modal
      okText="Delete Component"
      onCancel={closeModal}
      open={true}
      uiKey={UiKey.ComponentModalDelete}
    >
      <ModalForm.Form
        errorMessage="Error while deleting component"
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete component "{component?.name}"?</h4>
        <AutoFields omitFields={['id']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
