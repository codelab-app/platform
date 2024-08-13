import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import type { ICreateTagData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useTagService } from '../../services'
import { createTagSchema } from './create.tag.schema'
import { useCreateTagForm } from './create-tag.data'

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
    const tagService = useTagService()
    const { tagDomainService } = useDomainStore()
    const createTagForm = useCreateTagForm()

    const onSubmit = (input: ICreateTagData) => {
      void tagService.create(input)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const selectedOption = tagDomainService.selectedOption
    const closeForm = () => createTagForm.close()

    const model = {
      id: v4(),
      parent: selectedOption
        ? {
            id: selectedOption.value.toString(),
          }
        : undefined,
    }

    return (
      <Form<ICreateTagData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating tag',
        })}
        onSubmitSuccess={closeForm}
        schema={createTagSchema}
        submitRef={submitRef}
        uiKey={UiKey.CreateTagForm}
      >
        <AutoFields omitFields={['parent']} />
        <AutoField label="Parent Tag" name="parent.id" />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Tag" />
        </DisplayIf>
      </Form>
    )
  },
)
