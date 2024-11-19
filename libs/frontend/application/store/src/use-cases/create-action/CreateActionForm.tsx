import type { ICreateActionData } from '@codelab/shared/abstract/core'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectAction,
  SelectResource,
} from '@codelab/frontend/presentation/components/interface-form'
import { ResourceFetchConfigField } from '@codelab/frontend-application-resource/components'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { HttpMethod, IActionKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useActionService } from '../../services'
import { useActionSchema } from '../action-hooks'
import { createActionSchema } from './create-action.schema'
import { useCreateActionForm } from './create-action.state'

const CODE_ACTION = `function run() {
    // insert your code here
    // state.count += 2;
}`

export const CreateActionForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const actionService = useActionService()
    const createActionForm = useCreateActionForm()
    const actionSchema = useActionSchema(createActionSchema)
    const onSubmit = actionService.create
    const closeForm = createActionForm.close

    const model = {
      code: CODE_ACTION,
      config: {
        data: {
          body: '{}',
          headers: '{}',
          method: HttpMethod.GET,
          query: '',
          queryParams: '{}',
          urlSegment: '',
          variables: '{}',
        },
        id: v4(),
      },
      id: v4(),
      store: createActionForm.data,
    }

    return (
      <Form<ICreateActionData>
        errorMessage="Error while creating action"
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={actionSchema}
        submitRef={submitRef}
        uiKey={UiKey.ActionFormCreate}
      >
        <AutoFields
          omitFields={[
            'code',
            'resource',
            'config',
            'successAction',
            'errorAction',
            'actionsIds',
          ]}
        />

        {/** Code Action */}
        <DisplayIfField<ICreateActionData>
          condition={(context) => context.model.type === IActionKind.CodeAction}
        >
          <AutoField label="Action code" name="code" />
        </DisplayIfField>

        {/** Api Action */}
        <DisplayIfField<ICreateActionData>
          condition={(context) => context.model.type === IActionKind.ApiAction}
        >
          <SelectResource name="resource.id" />
          <AutoField component={SelectAction} name="successAction.id" />
          <AutoField component={SelectAction} name="errorAction.id" />
          <ResourceFetchConfigField />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Action" />
        </DisplayIf>
      </Form>
    )
  },
)
