'use client'

import type { IActionModel } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useActionService } from '../../services'

export const DeleteActionModal = observer<{ action: IActionModel }>(
  ({ action }) => {
    const router = useRouter()
    const actionService = useActionService()
    const closeModal = () => actionService.deletePopover.close(router)

    const onSubmit = () => {
      return actionService.removeMany([action])
    }

    return (
      <ModalForm.Modal
        okText="Delete Action"
        onCancel={closeModal}
        open={true}
        title="Delete Confirmation"
        uiKey={UiKey.ActionModalDelete}
      >
        <ModalForm.Form
          errorMessage="Error while deleting action"
          model={{}}
          onSubmit={onSubmit}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>Are you sure you want to delete action "{action.name}"?</h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
