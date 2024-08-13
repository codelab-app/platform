import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { Form } from '@codelab/frontend-presentation-components-form'
import type { ICreateComponentData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useComponentService } from '../../services'
import { createComponentSchema } from './create-component.schema'
import { useCreateComponentForm } from './create-component.state'

interface CreateComponentFormProps {
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateComponentForm = observer(
  ({ onSubmitSuccess, submitRef }: CreateComponentFormProps) => {
    const createForm = useCreateComponentForm()
    const componentService = useComponentService()

    const onSubmit = async (componentData: ICreateComponentData) => {
      await componentService.create(componentData)

      onSubmitSuccess?.()
    }

    const model = {
      id: v4(),
      name: '',
    }

    return (
      <Form<Omit<ICreateComponentData, 'rootElement'>>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating component',
        })}
        onSubmitSuccess={createForm.close}
        schema={createComponentSchema}
        submitRef={submitRef}
        uiKey={UiKey.CreateComponentForm}
      >
        <AutoFields omitFields={['api']} />
      </Form>
    )
  },
)
