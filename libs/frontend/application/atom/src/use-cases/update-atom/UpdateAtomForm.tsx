import type { IUpdateAtomData } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoFields, SelectField, TextField } from 'uniforms-antd'
import { useAtomService } from '../../services'
import { SelectAtom } from '../select-atom'
import { updateAtomSchema } from './update-atom.schema'
import { useUpdateAtomForm } from './update-atom.state'

export const UpdateAtomForm = observer(() => {
  const { tagDomainService } = useDomainStore()
  const updateAtomForm = useUpdateAtomForm()
  const atomService = useAtomService()
  const atom = updateAtomForm.data

  const onSubmit = (data: IUpdateAtomData) => {
    return atomService.update(data)
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

  const tagListOption = tagDomainService.tagsSelectOptions

  return (
    <Form<IUpdateAtomData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      schema={updateAtomSchema}
      uiKey={UiKey.UpdateAtomForm}
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
