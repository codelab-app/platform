import type { ICreateComponentData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import {
  type IFormController,
  type SubmitController,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { Form } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useComponentService } from '../../services'
import { createComponentSchema } from './create-component.schema'
import { useCreateComponentForm } from './create-component.state'

export const CreateComponentForm = observer(
  ({ onSubmitSuccess, submitRef }: IFormController) => {
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
        uiKey={UiKey.ComponentFormCreate}
      >
        <AutoFields omitFields={['api']} />
      </Form>
    )
  },
)
