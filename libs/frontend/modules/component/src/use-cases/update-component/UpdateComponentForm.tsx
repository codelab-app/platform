import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Form } from '@codelab/frontend/view/components'
import {
  IComponent,
  IComponentService,
  IUpdateComponentDTO,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateComponentSchema } from './createComponentSchema'

type UpdateComponentFormProps = {
  component: IComponent
  componentService: IComponentService
}
/**
 * Used for meta pane
 */
export const UpdateComponentForm = observer<UpdateComponentFormProps>(
  ({ component, componentService }) => {
    const model = {
      name: component.name,
    }

    const onSubmit = (input: IUpdateComponentDTO) => {
      return componentService.update(component, input)
    }

    return (
      <Form<IUpdateComponentDTO>
        autosave
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating component',
          type: 'error',
        })}
        schema={updateComponentSchema}
      >
        <AutoFields />
      </Form>
    )
  },
)
