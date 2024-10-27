'use client'

import type { IResourceModel } from '@codelab/frontend/abstract/domain'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useResourceService } from '../../services'

export const DeleteResourceModal = observer<{ resource: IResourceModel }>(
  ({ resource }) => {
    const resourceService = useResourceService()
    const router = useRouter()
    const onClose = () => router.push(PageType.Resources())
    const onSubmit = () => resourceService.removeMany([resource])

    return (
      <ModalForm.Modal
        okText="Delete Resource"
        onCancel={onClose}
        open={true}
        title="Delete Confirmation"
        uiKey={UiKey.ResourceModalDelete}
      >
        <ModalForm.Form
          errorMessage="Error while deleting resource"
          model={{}}
          onSubmit={onSubmit}
          onSubmitSuccess={onClose}
          schema={emptyJsonSchema}
        >
          <h4>Are you sure you want to delete resource {resource.name}"</h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
