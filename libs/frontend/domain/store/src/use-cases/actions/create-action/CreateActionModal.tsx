import type {
  IActionService,
  ICreateActionData,
  IResourceService,
  IStore,
} from '@codelab/frontend/abstract/core'
import { HttpMethod } from '@codelab/frontend/abstract/core'
import { SelectAction, SelectResource } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { ResourceType } from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createActionSchema } from './createActionSchema'

const defaultCodeAction = `function run() {
    // insert your code here
    // this.count += 2;
}`

export const CreateActionModal = observer<{
  actionService: IActionService
  resourceService: IResourceService
  store?: IStore
}>(({ actionService, resourceService, store }) => {
  const closeModal = () => actionService.createModal.close()

  const onSubmit = (data: ICreateActionData) => {
    return actionService.create(data)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating action',
  })

  const getResourceType = (context: Context<ICreateActionData>) =>
    context.model.resourceId
      ? resourceService.resource(context.model.resourceId)?.type
      : null

  const getResourceApiUrl = (context: Context<ICreateActionData>) =>
    context.model.resourceId
      ? resourceService.resource(context.model.resourceId)?.config.get('url')
      : null

  return (
    <ModalForm.Modal
      okText="Create Action"
      onCancel={closeModal}
      open={actionService.createModal.isOpen}
    >
      <ModalForm.Form<ICreateActionData>
        model={{
          storeId: store?.id,
          code: defaultCodeAction,
          config: {
            body: '{}',
            method: HttpMethod.GET,
            query: '',
            headers: '{}',
            variables: '{}',
            queryParams: '{}',
            urlSegment: '',
          },
        }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createActionSchema}
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
            <AutoField getUrl={getResourceApiUrl} name="config.query" />
            <AutoField name="config.variables" />
            <AutoField name="config.headers" />
          </DisplayIfField>

          {/** Rest Config Form */}
          <DisplayIfField<ICreateActionData>
            condition={(context) =>
              getResourceType(context) === ResourceType.Rest
            }
          >
            <AutoField name="config.urlSegment" />
            <AutoField name="config.method" />
            <AutoField name="config.body" />
            <AutoField name="config.queryParams" />
            <AutoField name="config.headers" />
            <AutoField name="config.responseType" />
          </DisplayIfField>
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
