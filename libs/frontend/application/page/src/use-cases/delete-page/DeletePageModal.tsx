'use client'

import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { usePageService } from '../../services'
import { useDeletePageModal } from './delete-page.state'

export const DeletePageModal = observer(({ page }: { page: IPageModel }) => {
  const deletePageModal = useDeletePageModal()
  const pageService = usePageService()
  const closeModal = () => deletePageModal.close()

  return (
    <ModalForm.Modal
      okText="Delete Page"
      onCancel={closeModal}
      open={deletePageModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={() => pageService.remove(page)}
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
