import { IPreRenderService } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeletePreRenderModal = observer<{
  preRenderService: IPreRenderService
}>(({ preRenderService }) => {
  const closeModal = () => preRenderService.deleteModal.close()
  const preRender = preRenderService.deleteModal.preRender

  if (!preRender) {
    return null
  }

  const onSubmit = () => preRenderService.delete(preRender.id)

  return (
    <ModalForm.Modal
      okText="Delete PreRender"
      onCancel={closeModal}
      visible={preRenderService.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{ id: preRender.id }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while deleting PreRender',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete Pre Render "{preRender.id}"?</h4>
        <AutoFields omitFields={['id']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
