import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { WithResourceService } from '../../../store'
import {
  CreateResourceInput,
  createResourceSchema,
} from './createResourceSchema'

export const CreateResourceModal = observer<WithResourceService>(
  ({ resourceService }) => {
    const { user } = useUser()
    const closeModal = () => resourceService.createModal.close()

    const onSubmit = (input: CreateResourceInput) =>
      resourceService.createResource(input)

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating resource',
    })

    return (
      <ModalForm.Modal
        okText="Create Resource"
        onCancel={closeModal}
        visible={resourceService.createModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createResourceSchema}
        >
          <AutoFields omitFields={['data']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
