import type { IUpdateAtomData } from '@codelab/frontend/abstract/core'
import { SelectAtom } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField, TextField } from 'uniforms-antd'
import { updateAtomSchema } from './update-atom.schema'

export const UpdateAtomForm = observer(() => {
  const { atomService, tagService } = useStore()
  const atom = atomService.updateForm.atom
  const closeForm = () => atomService.updateForm.close()

  const onSubmit = (atomDTO: IUpdateAtomData) => {
    return atomService.update(atomDTO)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating atom',
  })

  const model = {
    externalCssSource: atom?.externalCssSource,
    // `null` bypass the required condition if the field is originally nullable
    externalJsSource: atom?.externalJsSource ?? undefined,
    externalSourceType: atom?.externalSourceType ?? undefined,
    id: atom?.id,
    name: atom?.name,
    requiredParents: atom?.requiredParents.map((child) => child.id),
    suggestedChildren: atom?.suggestedChildren.map(
      (suggestedChild) => suggestedChild.id,
    ),
    tags: atom?.tags,
    type: atom?.type,
  }

  const tagListOption = tagService.tagsSelectOptions

  return (
    <Form<IUpdateAtomData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      schema={updateAtomSchema}
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

      <FormController onCancel={closeForm} submitLabel="Update Atom" />
    </Form>
  )
})
