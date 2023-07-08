import type { ICreateActionData, IStore } from '@codelab/frontend/abstract/core'
import { HttpMethod } from '@codelab/frontend/abstract/core'
import { SelectAction, SelectResource } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import { DisplayIfField, ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ResourceType } from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createActionSchema } from './create-action.schema'

const CODE_ACTION = `function run() {
    // insert your code here
    // state.count += 2;
}`

export const CreateActionModal = observer<{ store?: IStore }>(({ store }) => {
  const { actionService, resourceService } = useStore()

  const onSubmit = (actionDTO: ICreateActionData) => {
    console.log('submit', actionDTO)

    return actionService.create(actionDTO)
  }

  const closeModal = () => actionService.createModal.close()

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
    storeId: store?.id,
  }

  return (
    <ModalForm.Modal
      okText="Create Action"
      onCancel={closeModal}
      open={actionService.createModal.isOpen}
    >
      <ModalForm.Form<ICreateActionData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating action',
        })}
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
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
