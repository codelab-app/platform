import type {
  IComponent,
  IUpdateComponentData,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Form, FormContextProvider } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateComponentSchema } from './update-component.schema'

interface UpdateComponentFormProps {
  component: IComponent
}
/**
 * Used for meta pane
 */
export const UpdateComponentForm = observer<UpdateComponentFormProps>(
  ({ component }) => {
    const { componentService } = useStore()

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
