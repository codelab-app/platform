'use client'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'

import { NewRoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useComponentService } from '../../services'

export const DeleteComponentModal = observer<{ component: IComponentModel }>(
  ({ component }) => {
    const router = useRouter()
    const componentService = useComponentService()
    const closeModal = () => router.push(NewRoutePaths.Component.base())

    const onSubmit = async () => {
      await componentService.removeMany([component])
    }

    return (
      <ModalForm.Modal
        okText="Delete Component"
        onCancel={closeModal}
        open={true}
        uiKey={UiKey.ComponentModalDelete}
      >
        <ModalForm.Form
          errorMessage="Error while deleting component"
          model={{}}
          onSubmit={onSubmit}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>Are you sure you want to delete component "{component.name}"?</h4>
          <AutoFields omitFields={['id']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
