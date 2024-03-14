import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { ResourceFetchConfigField } from '@codelab/frontend/application/resource'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  SelectAction,
  SelectResource,
} from '@codelab/frontend/application/type'
import {
  DisplayIf,
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { ICreateActionData } from '@codelab/shared/abstract/core'
import { HttpMethod, IActionKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useActionSchema } from '../hooks'
import { createActionSchema } from './create-action.schema'

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
    const { actionService, resourceService } = useStore()
    const actionSchema = useActionSchema(createActionSchema)

    const onSubmit = (actionDto: ICreateActionData) => {
      const promise = actionService.create(actionDto)

      onSubmitSuccess?.()

      return promise
    }

    const closeForm = () => actionService.createForm.close()

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
      storeId: actionService.createForm.store?.id,
    }

    return (
      <Form<ICreateActionData>
        key={MODEL_ACTION.CreateAction.key}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating action',
        })}
        onSubmitSuccess={closeForm}
        schema={actionSchema}
        submitRef={submitRef}
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
