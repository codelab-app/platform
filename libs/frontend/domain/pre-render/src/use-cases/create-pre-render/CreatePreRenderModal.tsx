import {
  ICreatePreRenderDTO,
  IPreRenderService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { createPreRenderSchema } from './createPreRenderSchema'

const defaultCode = `function run(ctx) {
    // insert your code here
}`

export const CreatePreRenderModal = observer<{
  preRenderService: IPreRenderService
  pageId: string
}>(({ preRenderService, pageId }) => {
  const handleSubmit = (data: ICreatePreRenderDTO) => {
    return preRenderService.create([data])
  }

  const closeModal = () => preRenderService.createModal.close()

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating preRender',
  })

  return (
    <ModalForm.Modal
      okText="Create PreRender"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Create preRender</span>}
      visible={preRenderService.createModal.isOpen}
    >
      <ModalForm.Form<ICreatePreRenderDTO>
        model={{
          code: defaultCode,
          pageId,
        }}
        onSubmit={handleSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createPreRenderSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
