import type { ICreateAtomData } from '@codelab/frontend/abstract/domain'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields, SelectField, TextField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useCreateAtomAction } from './create-atom.action'
import { createAtomSchema } from './create-atom.schema'
import { useCreateAtomModal } from './create-atom.state'

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
    const { tagDomainService } = useDomainStore()
    const createAtomAction = useCreateAtomAction
    const createAtomForm = useCreateAtomModal()
    const closeForm = () => createAtomForm.close()

    const onSubmit = async (data: ICreateAtomData) => {
      const res = await createAtomAction(data)

      onSubmitSuccess?.()

      return res
    }

    const onSubmitError = createFormErrorNotificationHandler({
      title: 'Error while creating atom',
    })

    const tagsSelectionOptions = tagDomainService.tagsSelectOptions

    return (
      <Form<ICreateAtomData>
        model={{
          id: v4(),
        }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeForm}
        schema={createAtomSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.CreateAtom.key}
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
