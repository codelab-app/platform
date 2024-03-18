import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { ICreateTagData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createTagSchema } from './create.tag.schema'

interface CreateTagFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateTagForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreateTagFormProps) => {
    const { tagService } = useStore()

    const onSubmit = (input: ICreateTagData) => {
      void tagService.create(input)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const defaultOption = tagService.tagDomainService.selectedOption
    const closeForm = () => tagService.createForm.close()

    return (
      <Form<ICreateTagData>
        model={{
          id: v4(),
          parent: { id: defaultOption.value.toString() },
        }}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating tag',
        })}
        onSubmitSuccess={closeForm}
        schema={createTagSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.CreateTag.key}
      >
        <AutoFields omitFields={['parent']} />
        {/* <DisplayIfNotRoot> */}
        <AutoField label="Parent Tag" name="parent.id" />
        {/* </DisplayIfNotRoot> */}
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Tag" />
        </DisplayIf>
      </Form>
    )
  },
)
