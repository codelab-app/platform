import type { IUpdateAtomData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField, TextField } from 'uniforms-antd'
import { SelectAtom } from '../select-atom'
import { useUpdateAtomAction } from './update-atom.action'
import { updateAtomSchema } from './update-atom.schema'
import { useUpdateAtomForm } from './update-atom.state'

export const UpdateAtomForm = observer(() => {
  const { tagService } = useStore()
  const updateAtomForm = useUpdateAtomForm()
  const updateAtomAction = useUpdateAtomAction
  const atom = updateAtomForm.data?.current

  const onSubmit = (atomDTO: IUpdateAtomData) => {
    return updateAtomAction(atomDTO)
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
    <Form<IUpdateAtomData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
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

      <FormController submitLabel="Update Atom" />
    </Form>
  )
})
