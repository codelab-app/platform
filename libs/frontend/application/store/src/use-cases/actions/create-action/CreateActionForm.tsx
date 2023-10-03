import type { ICreateActionData } from '@codelab/frontend/abstract/core'
import { HttpMethod } from '@codelab/frontend/abstract/core'
import type { SubmitController } from '@codelab/frontend/abstract/types'
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
import { ResourceType } from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { Context } from 'uniforms'
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

    const onSubmit = (actionDTO: ICreateActionData) => {
      console.log('submit', actionDTO)

      const promise = actionService.create(actionDTO)

      onSubmitSuccess?.()

      return promise
    }

    const closeForm = () => actionService.createForm.close()

    const getResourceType = ({ model }: Context<ICreateActionData>) =>
      model.resourceId ? resourceService.resource(model.resourceId)?.type : null

    const getResourceApiUrl = ({ model }: Context<ICreateActionData>) =>
      model.resourceId
        ? resourceService.resource(model.resourceId)?.config.current.get('url')
        : null

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
            'resourceId',
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
          <SelectResource name="resourceId" resourceService={resourceService} />
          <AutoField component={SelectAction} name="successActionId" />
          <AutoField component={SelectAction} name="errorActionId" />

          {/** GraphQL Config Form */}
          <DisplayIfField<ICreateActionData>
            condition={(context) =>
              getResourceType(context) === ResourceType.GraphQL
            }
          >
            <AutoField getUrl={getResourceApiUrl} name="config.data.query" />
            <AutoField name="config.data.variables" />
            <AutoField name="config.data.headers" />
          </DisplayIfField>

          {/** Rest Config Form */}
          <DisplayIfField<ICreateActionData>
            condition={(context) =>
              getResourceType(context) === ResourceType.Rest
            }
          >
            <AutoField name="config.data.urlSegment" />
            <AutoField name="config.data.method" />
            <AutoField name="config.data.body" />
            <AutoField name="config.data.queryParams" />
            <AutoField name="config.data.headers" />
            <AutoField name="config.data.responseType" />
          </DisplayIfField>
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Action" />
        </DisplayIf>
      </Form>
    )
  },
)
