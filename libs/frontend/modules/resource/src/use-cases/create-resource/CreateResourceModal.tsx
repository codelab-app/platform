import { WithTypeService } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceModalInterfaceForm } from '../../components/ResourceModalInterfaceForm'
import { CreateResourceInput } from '../../schema/initialResourceSchema'
import { WithResourceService } from '../../store'
import { createResourceSchema } from './createResourceSchema'

export const CreateResourceModal = observer(
  ({ resourceService, typeService }: WithResourceService & WithTypeService) => {
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
        <ResourceModalInterfaceForm
          initialSchema={createResourceSchema}
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          typeService={typeService}
        />
      </ModalForm.Modal>
    )
  },
)
