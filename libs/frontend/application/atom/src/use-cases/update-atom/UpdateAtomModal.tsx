import type { IUpdateAtomData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { DisplayIfField, ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField, TextField } from 'uniforms-antd'
import { SelectAtom } from '../select-atom'
import { updateAtomSchema } from './update-atom.schema'

export const UpdateAtomModal = observer(() => {
  const { atomService, tagService } = useStore()
  const atom = atomService.updateModal.atom
  const closeModal = () => atomService.updateModal.close()

  const onSubmit = (atomDTO: IUpdateAtomData) => {
    return atomService.update(atomDTO)
  }

  const onSubmitError = createFormErrorNotificationHandler({
    title: 'Error while updating atom',
  })

  const model = {
    externalCssSource: atom?.externalCssSource,
    // `null` bypass the required condition if the field is originally nullable
    externalJsSource: atom?.externalJsSource ?? undefined,
    externalSourceType: atom?.externalSourceType ?? undefined,
    id: atom?.id,
    name: atom?.name,
    requiredParents: atom?.requiredParents.map((child) => child),
    suggestedChildren: atom?.suggestedChildren.map(
      (suggestedChild) => suggestedChild,
    ),
    tags: atom?.tags,
    type: atom?.type,
  }

  const tagListOption = tagService.tagDomainService.tagsSelectOptions

  return (
    <ModalForm.Modal
      okText="Update Atom"
      onCancel={closeModal}
      open={atomService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateAtomData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateAtomSchema}
        uiKey={MODEL_ACTION.UpdateAtom.key}
      >
        <AutoFields
          omitFields={[
            'tags',
            'suggestedChildren',
            'requiredParents',
            'externalCssSource',
            'externalJsSource',
            'externalSourceType',
          ]}
        />
        <DisplayIfField<IUpdateAtomData>
          condition={(context) =>
            context.model.type === IAtomType.ExternalComponent
          }
        >
          <TextField name="externalCssSource" />
          <TextField name="externalJsSource" required />
          <TextField name="externalSourceType" required />
        </DisplayIfField>
        <SelectField
          label="Connect Tag"
          mode="multiple"
          name="tags"
          optionFilterProp="label"
          options={tagListOption}
          showSearch={true}
        />
        <SelectAtom label="Suggested Children" name="suggestedChildren" />
        <SelectAtom label="Required Parents" name="requiredParents" />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
