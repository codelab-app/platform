'use client'

import type { ICreateAtomData } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  ModalForm,
} from '@codelab/frontend-presentation-components-form'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields, SelectField, TextField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useAtomService } from '../../services'
import { createAtomSchema } from './create-atom.schema'
import { useCreateAtomModal } from './create-atom.state'

export const CreateAtomModal = observer(() => {
  const atomService = useAtomService()
  const { tagDomainService } = useDomainStore()
  const createAtomModal = useCreateAtomModal()
  const closeModal = () => createAtomModal.close()

  const onSubmit = async (data: ICreateAtomData) =>
    await atomService.create(data)

  const onSubmitError = createFormErrorNotificationHandler({
    title: 'Error while creating atom',
  })

  const tagsSelectionOptions = tagDomainService.tagsSelectOptions

  return (
    <ModalForm.Modal
      okText="Create Atom"
      onCancel={closeModal}
      open={createAtomModal.isOpen}
    >
      <ModalForm.Form<ICreateAtomData>
        model={{
          id: v4(),
        }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createAtomSchema}
        uiKey={UiKey.CreateAtomModal}
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
