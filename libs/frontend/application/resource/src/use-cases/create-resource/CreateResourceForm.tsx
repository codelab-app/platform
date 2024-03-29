import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { ICreateResourceData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createResourceSchema } from './create-resource.schema'

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
    const { resourceService } = useStore()
    const closeForm = () => resourceService.createModal.close()

    const onSubmit = (resourceDTO: ICreateResourceData) => {
      void resourceService.create(resourceDTO)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const model = {
      id: v4(),
      type: resourceService.createModal.metadata?.type,
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
