'use client'

import type { ICreateActionData } from '@codelab/shared-abstract-core'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { ResourceFetchConfigField } from '@codelab/frontend-application-resource/components'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx-context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { HttpMethod, IActionKind } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useActionService } from '../../services'
import { useActionSchema } from '../action-hooks'
import { createActionSchema } from './create-action.schema'

interface CreateActionFormProps extends IFormController {
  storeId: string
}

const CODE_ACTION = `function run() {
    // insert your code here
    // state.count += 2;
}`

export const CreateActionForm = observer<CreateActionFormProps>(
  ({ onSubmitSuccess, showFormControl = true, storeId, submitRef }) => {
    const actionService = useActionService()

    const { actionDomainService, resourceDomainService, storeDomainService } =
      useDomainStore()

    const actionSchema = useActionSchema(createActionSchema)
    const { builderService } = useApplicationStore()
    const selectedNode = builderService.selectedNode?.maybeCurrent
    const store = selectedNode?.runtimeStore.store.current
    const onSubmit = actionService.create

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
      name: '',
      resource: {
        id: v4(),
      },
      store: storeDomainService.stores.get(storeId),
      type: IActionKind.CodeAction,
    } as ICreateActionData

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
          <SelectField
            name="resource.id"
            options={resourceDomainService.getSelectOption()}
          />
          <SelectField
            name="successAction"
            options={actionDomainService.getSelectActionOptions(store!)}
          />
          <SelectField
            name="errorAction"
            options={actionDomainService.getSelectActionOptions(store!)}
          />
          <ResourceFetchConfigField />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Create Action" />
        </DisplayIf>
      </Form>
    )
  },
)
