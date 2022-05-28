import {
  ACTION_SERVICE,
  RESOURCE_SERVICE,
  STORE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { SelectResource } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { ICreateActionDTO, ResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useCurrentStore } from '../../../hooks'
import { createActionSchema } from './createActionSchema'

export const CreateActionModal = observer<
  WithServices<ACTION_SERVICE | STORE_SERVICE | RESOURCE_SERVICE>
>(({ actionService, storeService, resourceService }) => {
  const { store } = useCurrentStore(storeService)
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
        model={{ storeId: store?.id }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createActionSchema}
      >
        <AutoFields omitFields={['storeId', 'resourceId', 'config']} />

        <AutoField
          component={observer((props) => (
            <SelectResource
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(props as any)}
              resourceService={resourceService}
            />
          ))}
          name="resourceId"
        />

        {/**
         *
         *  GraphQL Operation Config Form
         *
         */}
        <DisplayIfField<ICreateActionDTO>
          condition={(c) => getResourceType(c) === ResourceType.GraphQL}
        >
          <AutoField name="config.query" />
          <AutoField name="config.variables" />
        </DisplayIfField>

        {/**
         *
         *  Rest Operation Config Form
         *
         */}
        <DisplayIfField<ICreateActionDTO>
          condition={(c) => getResourceType(c) === ResourceType.Rest}
        >
          <AutoField name="config.method" />
          <AutoField name="config.body" />
          <AutoField name="config.queryParams" />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
