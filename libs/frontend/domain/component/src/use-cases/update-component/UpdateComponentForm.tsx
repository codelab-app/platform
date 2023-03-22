import type {
  IComponent,
  IComponentService,
  IUpdateComponentData,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Form, FormContextProvider } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateComponentSchema } from './update-component.schema'

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
      childrenContainerElement: {
        id: component.childrenContainerElement.current.id,
      },
      id: component.id,
      name: component.name,
    }

    const onSubmit = (componentData: IUpdateComponentData) =>
      componentService.update(componentData)

    return (
      <FormContextProvider value={{ elementTree: component }}>
        <Form<IUpdateComponentData>
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
      </FormContextProvider>
    )
  },
)
