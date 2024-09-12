import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectAction,
  SelectResource,
} from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ResourceFetchConfigField } from '@codelab/frontend-application-resource/components'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import type { ICreateActionData } from '@codelab/shared/abstract/core'
import { HttpMethod, IActionKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
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

interface CreateActionFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateActionForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreateActionFormProps) => {
    const actionService = useActionService()
    const createActionForm = useCreateActionForm()
    const actionSchema = useActionSchema(createActionSchema)

    const onSubmit = (actionDto: ICreateActionData) => {
      const promise = actionService.create(actionDto)

      onSubmitSuccess?.()

      return promise
    }

    const closeForm = () => createActionForm.close()

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
      storeId: createActionForm.data?.id,
    }

    return (
      <Form<ICreateActionData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating action',
        })}
        onSubmitSuccess={closeForm}
        schema={actionSchema}
        submitRef={submitRef}
        uiKey={UiKey.CreateActionForm}
      >
        <AutoFields
          omitFields={[
            'code',
            'resource',
            'config',
            'successActionId',
            'errorActionId',
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
          <AutoField component={SelectAction} name="successActionId" />
          <AutoField component={SelectAction} name="errorActionId" />
          <ResourceFetchConfigField />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Action" />
        </DisplayIf>
      </Form>
    )
  },
)
