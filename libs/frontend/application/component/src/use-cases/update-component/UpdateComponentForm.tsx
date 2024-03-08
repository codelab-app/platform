import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Form } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { IUpdateComponentData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateComponentSchema } from './update-component.schema'

/**
 * Used for meta pane
 */
export const UpdateComponentForm = observer<{ component: IComponentModel }>(
  ({ component }) => {
    const { componentService } = useStore()
    const [key, setKey] = useState('')

    // for some reason FormContextProvider is not
    // updated when the component is updated
    useEffect(() => {
      setKey(component.id)
    }, [component])

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
      <Form<IUpdateComponentData>
        autosave
        key={key}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating component',
        })}
        schema={updateComponentSchema}
      >
        <AutoFields />
      </Form>
    )
  },
)
