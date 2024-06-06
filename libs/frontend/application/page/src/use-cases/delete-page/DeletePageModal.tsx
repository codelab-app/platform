import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  emptyJsonSchema,
  ModalForm,
} from '@codelab/frontend-presentation-view/components/form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeletePageModal = observer(({ page }: { page: IPageModel }) => {
  const { pageService } = useStore()
  const closeModal = () => pageService.deleteModal.close()

  return (
    <ModalForm.Modal
      okText="Delete Page"
      onCancel={closeModal}
      open={pageService.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={() => pageService.delete([page])}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting page',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeletePage.key}
      >
        <h4>Are you sure you want to delete page "{page.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
