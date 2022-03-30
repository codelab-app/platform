import { TypeService } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { AutoFields } from 'uniforms-antd'
import { Resource, ResourceService, WithResourceService } from '../..'
import { ResourceModalInterfaceForm } from '../../components/ResourceModalInterfaceForm'
import { initialResourceSchema } from '../../schema/initialResourceSchema'
import { UpdateResourceInput, updateResourceSchema } from './updateResourceSchema'
import { getSnapshot } from 'mobx-keystone'

export const UpdateResourceModal = observer(
  ({ resourceService, typeService }: WithResourceService<{ typeService: TypeService }>) => {

    const resource = resourceService.updateModal.resource
    const deserializedResource = useMemo(() => {
      if (!resource) return {}
      const deserializedResource = getSnapshot(resource)

      return {
        ...deserializedResource,
        ...(JSON.parse(deserializedResource.data) || {}),
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
          typeService={typeService}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          initialSchema={initialResourceSchema}
          model={deserializedResource}
        />
      </ModalForm.Modal>
    )
  },
)
