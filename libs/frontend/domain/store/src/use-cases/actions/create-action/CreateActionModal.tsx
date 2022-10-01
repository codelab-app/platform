import { SelectAction, SelectResource } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { ResourceType } from '@codelab/shared/abstract/codegen'
import {
  HttpMethod,
  IActionKind,
  IActionService,
  ICreateActionDTO,
  IResourceService,
  IStore,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createActionSchema } from './createActionSchema'

const defaultCodeAction = `function run() {
    // insert your code here 
    // this.count += 2; 
}`

export const CreateActionModal = observer<{
  actionService: IActionService
  resourceService: IResourceService
  store: IStore
}>(({ actionService, resourceService, store }) => {
  const closeModal = () => actionService.createModal.close()

  const onSubmit = (data: ICreateActionDTO) => {
    return actionService.create([data])
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating action',
  })

  const getResourceType = (c: Context<ICreateActionDTO>) =>
    c.model.resourceId
      ? resourceService.resource(c.model.resourceId)?.type
      : null

  return (
    <ModalForm.Modal
      okText="Create Action"
      onCancel={closeModal}
      visible={actionService.createModal.isOpen}
    >
      <ModalForm.Form<ICreateActionDTO>
        model={{
          storeId: store.id,
          code: defaultCodeAction,
          actionsIds: [],
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
        <DisplayIfField<ICreateActionDTO>
          condition={(c) => c.model.type === IActionKind.CodeAction}
        >
          <AutoField label="Action code" name="code" />
        </DisplayIfField>

        {/** Api Action */}
        <DisplayIfField<ICreateActionDTO>
          condition={(c) => c.model.type === IActionKind.ApiAction}
        >
          <SelectResource name="resourceId" resourceService={resourceService} />

          <SelectAction
            actionService={actionService}
            name="successActionId"
            storeId={store.id}
          />

          <SelectAction
            actionService={actionService}
            name="errorActionId"
            storeId={store.id}
          />

          {/** GraphQL Config Form */}
          <DisplayIfField<ICreateActionDTO>
            condition={(c) => getResourceType(c) === ResourceType.GraphQL}
          >
            <AutoField name="config.query" />
            <AutoField name="config.variables" />
            <AutoField name="config.headers" />
          </DisplayIfField>

          {/** Rest Config Form */}
          <DisplayIfField<ICreateActionDTO>
            condition={(c) => getResourceType(c) === ResourceType.Rest}
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
