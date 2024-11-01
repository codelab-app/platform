import type { ICreateComponentData, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import { Form } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useComponentService } from '../../services'
import { createComponentSchema } from './create-component.schema'

export const CreateComponentForm = observer<IFormController & { owner: IRef }>(
  ({ onSubmitSuccess, owner, submitRef }) => {
    const createForm = useCreateComponentForm()
    const componentService = useComponentService()

    const onSubmit = (componentData: ICreateComponentData) =>
      componentService.create(componentData)

    const model = {
      id: v4(),
      name: '',
      owner,
    }

    return (
      <Form<Omit<ICreateComponentData, 'rootElement'>>
        errorMessage="Error while creating component"
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={createComponentSchema}
        submitRef={submitRef}
        uiKey={UiKey.ComponentFormCreate}
      >
        <AutoFields omitFields={['api']} />
      </Form>
    )
  },
)
