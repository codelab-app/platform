import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { ResourceFetchConfigField } from '@codelab/frontend/application/resource'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  SelectAction,
  SelectResource,
} from '@codelab/frontend/application/type'
import { DisplayIfField, ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { ICreateActionData } from '@codelab/shared/abstract/core'
import { HttpMethod, IActionKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createActionSchema } from './create-action.schema'

const CODE_ACTION = `function run() {
    // insert your code here
    // state.count += 2;
}`

export const CreateActionModal = observer<{ store?: IStoreModel }>(
  ({ store }) => {
    const { actionService, resourceService } = useStore()

    const onSubmit = (actionDTO: ICreateActionData) => {
      return actionService.create(actionDTO)
    }

    const closeModal = () => actionService.createModal.close()

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
          onSubmitError={createFormErrorNotificationHandler({
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
            condition={(context) =>
              context.model.type === IActionKind.CodeAction
            }
          >
            <AutoField label="Action code" name="code" />
          </DisplayIfField>

          {/** Api Action */}
          <DisplayIfField<ICreateActionData>
            condition={(context) =>
              context.model.type === IActionKind.ApiAction
            }
          >
            <SelectResource name="resourceId" />
            <AutoField component={SelectAction} name="successActionId" />
            <AutoField component={SelectAction} name="errorActionId" />

            <ResourceFetchConfigField />
          </DisplayIfField>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
