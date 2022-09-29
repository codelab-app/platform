import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import {
  IPreRenderService,
  IUpdatePreRenderDTO,
} from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { updatePreRenderSchema } from './updatePreRenderSchema'

export const UpdatePreRenderModal = observer<{
  preRenderService: IPreRenderService
}>(({ preRenderService }) => {
  const updatedPreRender = preRenderService.updateModal.preRender

  if (!updatedPreRender) {
    return null
  }

  const handleSubmit = (input: IUpdatePreRenderDTO) => {
    if (!updatedPreRender) {
      throw new Error('PreRenderService.updateModal.preRender is null')
    }

    return preRenderService.update(updatedPreRender, input)
  }

  const model = {
    code: updatedPreRender.code,
    type: updatedPreRender.type,
    pageId: updatedPreRender.page.id,
    id: updatedPreRender.id,
  }

  const closeModal = () => preRenderService.updateModal.close()

  return (
    <ModalForm.Modal
      okText="Update PreRender"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Update PreRender</span>}
      visible={preRenderService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdatePreRenderDTO>
        model={model}
        onSubmit={handleSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating PreRender',
          type: 'error',
        })}
        onSubmitSuccess={closeModal}
        schema={updatePreRenderSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
