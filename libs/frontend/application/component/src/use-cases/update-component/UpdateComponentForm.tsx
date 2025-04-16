'use client'

import type { IRuntimeComponentModel } from '@codelab/frontend-abstract-application'
import type { IUpdateComponentData } from '@codelab/shared-abstract-core'

import { UiKey } from '@codelab/frontend-abstract-types'
import { Form } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
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
        errorMessage="Error while creating component"
        model={model}
        onSubmit={onSubmit}
        schema={updateComponentSchema}
        uiKey={UiKey.ComponentFormUpdate}
      >
        <AutoFields />
      </Form>
    </div>
  )
})
