import type { ICreateAtomData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  DisplayIfField,
  ModalForm,
} from '@codelab/frontend-presentation-view/components'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields, SelectField, TextField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAtomSchema } from './create-atom.schema'

export const CreateAtomModal = observer(() => {
  const { atomService, tagService } = useStore()
  const closeModal = () => atomService.createModal.close()

  const onSubmit = async (data: ICreateAtomData) =>
    await atomService.create(data)

  const onSubmitError = createFormErrorNotificationHandler({
    title: 'Error while creating atom',
  })

  const tagsSelectionOptions = tagService.tagDomainService.tagsSelectOptions

  return (
    <ModalForm.Modal
      okText="Create Atom"
      onCancel={closeModal}
      open={atomService.createModal.isOpen}
    >
      <ModalForm.Form<ICreateAtomData>
        model={{
          id: v4(),
        }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createAtomSchema}
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
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
