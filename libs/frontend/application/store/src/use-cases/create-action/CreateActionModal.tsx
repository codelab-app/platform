import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import type { ICreateActionData } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectAction,
  SelectResource,
} from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ResourceFetchConfigField } from '@codelab/frontend-application-resource/components'
import {
  DisplayIfField,
  ModalForm,
} from '@codelab/frontend-presentation-components-form'
import { HttpMethod, IActionKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useActionService } from '../../services'
import { createActionSchema } from './create-action.schema'
import { useCreateActionModal } from './create-action.state'

const CODE_ACTION = `function run() {
    // insert your code here
    // state.count += 2;
}`

export const CreateActionModal = observer<{ store?: IStoreModel }>(
  ({ store }) => {
    const actionService = useActionService()
    const createActionModal = useCreateActionModal()

    const onSubmit = (actionDto: ICreateActionData) => {
      return actionService.create(actionDto)
    }

    const closeModal = () => createActionModal.close()

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
        open={createActionModal.isOpen}
        uiKey={UiKey.ActionModalCreate}
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
              'resource',
              'config',
              'successActionId',
              'errorActionId',
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
            <SelectResource name="resource" />
            <AutoField component={SelectAction} name="successActionId" />
            <AutoField component={SelectAction} name="errorActionId" />

            <ResourceFetchConfigField />
          </DisplayIfField>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
