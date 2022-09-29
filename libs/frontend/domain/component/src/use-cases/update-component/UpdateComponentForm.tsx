import {
  IComponent,
  IComponentService,
  IUpdateComponentDTO,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Form } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateComponentSchema } from './updateComponentSchema'

interface UpdateComponentFormProps {
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
      <Form<Omit<IUpdateComponentDTO, 'rootElementId'>>
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
