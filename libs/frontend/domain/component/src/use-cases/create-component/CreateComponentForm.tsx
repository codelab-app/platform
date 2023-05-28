import type { ICreateComponentData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createComponentSchema } from './create-component.schema'

export const KEY_GENERATOR = `function run(props) {
    // props are of type component api
    return props.id
}`

export const CreateComponentForm = observer(() => {
  const { componentService, userService } = useStore()

  const onSubmit = (componentData: ICreateComponentData) => {
    return componentService.create(componentData)
  }

  const closeForm = () => componentService.createForm.close()

  const model = {
    id: v4(),
    keyGenerator: KEY_GENERATOR,
    owner: { auth0Id: userService.user.auth0Id },
  }

  return (
    <Form<ICreateComponentData>
      data-testid="create-component-form"
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating component',
      })}
      onSubmitSuccess={closeForm}
      schema={createComponentSchema}
    >
      <AutoFields omitFields={['childrenContainerElement', 'api']} />

      <FormController onCancel={closeForm} submitLabel="Create Component" />
    </Form>
  )
})
