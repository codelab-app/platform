import type { ICreateAtomData } from '@codelab/frontend/abstract/core'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  DisplayIf,
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields, SelectField, TextField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAtomSchema } from './create-atom.schema'

interface CreateAtomFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateAtomForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreateAtomFormProps) => {
    const { atomService, tagService, userService } = useStore()
    const closeForm = () => atomService.createModal.close()

    const onSubmit = async (data: ICreateAtomData) => {
      const res = await atomService.create(data)

      onSubmitSuccess?.()

      return res
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating atom',
    })

    const tagsSelectionOptions = tagService.tagsSelectOptions

    return (
      <Form<ICreateAtomData>
        model={{
          id: v4(),
          owner: { auth0Id: userService.user.auth0Id },
        }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeForm}
        schema={createAtomSchema}
        submitRef={submitRef}
      >
        <AutoFields
          omitFields={[
            'tags',
            'requiredParents',
            'externalCssSource',
            'externalJsSource',
            'externalSourceType',
          ]}
        />
        <DisplayIfField<ICreateAtomData>
          condition={(context) =>
            context.model.type === IAtomType.ExternalComponent
          }
        >
          <TextField name="externalCssSource" />
          <TextField name="externalJsSource" required />
          <TextField name="externalSourceType" required />
        </DisplayIfField>
        <AutoField name="requiredParents" />
        <SelectField
          label="Connect Tag"
          mode="multiple"
          name="tags"
          optionFilterProp="label"
          options={tagsSelectionOptions}
          showSearch={true}
        />

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Atom" />
        </DisplayIf>
      </Form>
    )
  },
)
