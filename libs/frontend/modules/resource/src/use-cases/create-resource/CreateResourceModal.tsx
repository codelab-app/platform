import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { Resource } from '../../store/resource.model'
import {
  CreateResourceInput,
  createResourceSchema,
} from './createResourceSchema'
import { ResourceService, WithResourceService } from '../..'

export const CreateResourceModal = observer(
  ({ resourceService }: WithResourceService) => {


    const closeModal = () => resourceService.createModal.close()

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating resource',
    })

    const onSubmit = (input: CreateResourceInput) => {
      return resourceService.add(input)
    }


    return (
      <ModalForm.Modal
        okText="Create"
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
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
