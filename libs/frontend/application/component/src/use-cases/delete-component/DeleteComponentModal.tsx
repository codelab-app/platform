import { UiKey } from '@codelab/frontend/abstract/types'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useComponentService } from '../../services'
import { useDeleteComponentModal } from './delete-component.state'

export const DeleteComponentModal = observer(() => {
  const deleteModal = useDeleteComponentModal()
  const componentService = useComponentService()
  const closeModal = () => deleteModal.close()
  const { setLoading } = useLoading()
  const component = deleteModal.data

  const onSubmit = async () => {
    if (!component) {
      return Promise.reject()
    }

    await componentService.removeMany([component])
    setLoading(false)
  }

  return (
    <ModalForm.Modal
      okText="Delete Component"
      onCancel={closeModal}
      open={deleteModal.isOpen}
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
