import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import type { ICreateResourceData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createResourceSchema } from './create-resource.schema'
import { createResourceUseCase } from './create-resource.use-case'
import { useCreateResourceModal } from './create-resource-modal.state'

interface CreateResourceFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateResourceForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreateResourceFormProps) => {
    const createResourceModal = useCreateResourceModal()
    const closeForm = () => createResourceModal.close()
    const resource = createResourceModal.data
    const { resourceDomainService } = useDomainStore()

    const onSubmit = (resourceDTO: ICreateResourceData) => {
      void createResourceUseCase(resourceDTO, resourceDomainService)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const model = {
      id: v4(),
      type: resource?.type,
    }

    return (
      <Form<ICreateResourceData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating resource',
        })}
        onSubmitSuccess={closeForm}
        schema={createResourceSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.CreateResource.key}
      >
        <AutoFields />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Type" />
        </DisplayIf>
      </Form>
    )
  },
)
