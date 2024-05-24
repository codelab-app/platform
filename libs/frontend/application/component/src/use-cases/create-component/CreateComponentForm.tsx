import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend-presentation-view/components'
import type { ICreateComponentData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createComponentSchema } from './create-component.schema'

export const KEY_GENERATOR = `function run(props) {
    // props are of type component api
    return props.id
}`

interface CreateComponentFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateComponentForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreateComponentFormProps) => {
    const { componentService, userService } = useStore()

    const onSubmit = (componentData: ICreateComponentData) => {
      const promise = componentService.create(componentData)

      onSubmitSuccess?.()

      return promise
    }

    const closeForm = () => componentService.createForm.close()

    const model = {
      id: v4(),
      owner: { auth0Id: userService.user.auth0Id },
    }

    return (
      <Form<Omit<ICreateComponentData, 'rootElement'>>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating component',
        })}
        onSubmitSuccess={closeForm}
        schema={createComponentSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.CreateComponent.key}
      >
        <AutoFields omitFields={['api']} />

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Component" />
        </DisplayIf>
      </Form>
    )
  },
)
