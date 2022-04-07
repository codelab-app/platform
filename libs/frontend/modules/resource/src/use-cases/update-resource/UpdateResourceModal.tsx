import { WithTypeService } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { ResourceModalInterfaceForm } from '../../components/ResourceModalInterfaceForm'
import { initialResourceSchema } from '../../schema/initialResourceSchema'
import { Resource, WithResourceService } from '../../store'
import { UpdateResourceInput } from './updateResourceSchema'

type UpdateResourceModalProps = WithResourceService & WithTypeService

export const UpdateResourceModal = observer<UpdateResourceModalProps>(
  ({ resourceService, typeService }) => {
    const resource = resourceService.updateModal.resource

    const deserializedResource = useMemo(() => {
      if (!resource) {
        return {}
      }

      const resourcesSnapshot = getSnapshot(resource)

      return {
        ...resourcesSnapshot,
        ...(JSON.parse(resourcesSnapshot.data) || {}),
      }
    }, [resource])

    const closeModal = () => resourceService.updateModal.close()

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating resource',
    })

    const onSubmit = (input: UpdateResourceInput) => {
      return resourceService.update(resource as Resource, input)
    }

    return (
      <ModalForm.Modal
        okText="Update"
        onCancel={closeModal}
        visible={Boolean(resource && resourceService.updateModal.isOpen)}
      >
        <ResourceModalInterfaceForm
          initialSchema={initialResourceSchema}
          model={deserializedResource}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          typeService={typeService}
        />
      </ModalForm.Modal>
    )
  },
)
