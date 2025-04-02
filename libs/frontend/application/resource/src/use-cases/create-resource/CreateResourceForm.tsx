import type { ICreateResourceData } from '@codelab/shared/abstract/core'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useResourceService } from '../../services'
import { createResourceSchema } from './create-resource.schema'

export const CreateResourceForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const resourceService = useResourceService()
    const { userDomainService } = useDomainStore()
    const user = userDomainService.user
    const owner = { id: user.id }
    const model = { config: {}, id: v4(), owner }
    const onSubmit = (data: ICreateResourceData) => resourceService.create(data)

    return (
      <Form<ICreateResourceData>
        errorMessage="Error while creating resource"
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={createResourceSchema}
        submitRef={submitRef}
        successMessage="Resource created successfully"
        uiKey={UiKey.ResourceFormCreate}
      >
        <AutoFields omitFields={['owner']} />
        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Create Type" />
        </DisplayIf>
      </Form>
    )
  },
)
