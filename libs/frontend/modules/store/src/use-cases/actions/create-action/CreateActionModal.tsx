import {
  ACTION_SERVICE,
  RESOURCE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { SelectAction, SelectResource } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { ResourceType } from '@codelab/shared/abstract/codegen'
import { ICreateActionDTO, IStore } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createActionSchema } from './createActionSchema'

export const CreateActionModal = observer<
  WithServices<ACTION_SERVICE | RESOURCE_SERVICE> & { store: IStore }
>(({ actionService, resourceService, store }) => {
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
      <ModalForm.Form
        model={{ storeId: store.id }}
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
            'successId',
            'errorId',
            'actionsIds',
          ]}
        />

        {/** Custom Action */}
        <DisplayIfField<ICreateActionDTO>
          condition={(c) => c.model.type === IActionKind.CustomAction}
        >
          <AutoField label="Action code" name="code" />
        </DisplayIfField>

        {/** Resource Action */}
        <DisplayIfField<ICreateActionDTO>
          condition={(c) => c.model.type === IActionKind.ResourceAction}
        >
          <SelectResource name="resourceId" resourceService={resourceService} />

          <SelectAction
            actionService={actionService}
            name="successId"
            storeId={store.id}
          />

          <SelectAction
            actionService={actionService}
            name="errorId"
            storeId={store.id}
          />

          {/** GraphQL Config Form */}
          <DisplayIfField<ICreateActionDTO>
            condition={(c) => getResourceType(c) === ResourceType.GraphQL}
          >
            <AutoField name="config.query" />
            <AutoField name="config.variables" />
            <AutoField label="Transform Response" name="config.transformFn" />
          </DisplayIfField>

          {/** Rest Config Form */}
          <DisplayIfField<ICreateActionDTO>
            condition={(c) => getResourceType(c) === ResourceType.Rest}
          >
            <AutoField name="config.method" />
            <AutoField name="config.code" />
            <AutoField name="config.queryParams" />
            <AutoField label="Transform Response" name="config.transformFn" />
          </DisplayIfField>
        </DisplayIfField>

        {/** Pipeline Action */}
        <DisplayIfField<ICreateActionDTO>
          condition={(c) => c.model.type === IActionKind.PipelineAction}
        >
          <AutoField label="Actions" name="actionsIds" />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
