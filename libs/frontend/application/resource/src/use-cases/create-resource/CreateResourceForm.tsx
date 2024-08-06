import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
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
import { useResourceService } from '../../services'
import { createResourceSchema } from './create-resource.schema'
import { useCreateResourceForm } from './create-resource.state'

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
    const createResourceForm = useCreateResourceForm()
    const resourceService = useResourceService()
    const closeForm = () => createResourceForm.close()
    const resource = createResourceForm.data

    const onSubmit = (data: ICreateResourceData) => {
      void resourceService.create(data)

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
