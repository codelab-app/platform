'use client'

import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { Form } from '@codelab/frontend-presentation-components-form'
import type { IUpdateComponentData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AutoFields } from 'uniforms-antd'
import { useComponentService } from '../../services/component.service'
import { updateComponentSchema } from './update-component.schema'

/**
 * Used for meta pane
 */
export const UpdateComponentForm = observer<{
  runtimeComponent: IRuntimeComponentModel
}>(({ runtimeComponent }) => {
  const componentService = useComponentService()
  const [key, setKey] = useState('')
  const component = runtimeComponent.component.current

  // for some reason FormContextProvider is not
  // updated when the component is updated
  useEffect(() => {
    setKey(component.id)
  }, [component])

  const model = {
    id: component.id,
    name: component.name,
  }

  const onSubmit = (componentData: IUpdateComponentData) =>
    componentService.update(componentData)

  return (
    <div key={key}>
      <Form<IUpdateComponentData>
        autosave
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating component',
        })}
        schema={updateComponentSchema}
        uiKey={MODEL_ACTION.UpdateComponent.key}
      >
        <AutoFields />
      </Form>
    </div>
  )
})
