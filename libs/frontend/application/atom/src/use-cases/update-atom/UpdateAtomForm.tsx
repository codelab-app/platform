'use client'

import type {
  IAtomModel,
  IUpdateAtomData,
} from '@codelab/frontend-abstract-domain'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IAtomType } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AutoFields, SelectField, TextField } from 'uniforms-antd'

import { useAtomService } from '../../services'
import { updateAtomSchema } from './update-atom.schema'

interface UpdateAtomFormProps extends IFormController {
  atom: IAtomModel
}

const omitFields = [
  'tags',
  'suggestedChildren',
  'requiredParents',
  'externalCssSource',
  'externalJsSource',
  'externalSourceType',
]

export const UpdateAtomForm = observer<UpdateAtomFormProps>(
  ({ atom, onSubmitSuccess, showFormControl = true, submitRef }) => {
    const { atomDomainService, tagDomainService } = useDomainStore()
    const atomService = useAtomService()
    const tagListOption = tagDomainService.tagsSelectOptions

    const tags = atom.tags
      .filter((tag) => tag.isValid)
      .map((tag) => tag.current)

    const model = useMemo(
      () => ({
        api: atom.api,
        externalCssSource: atom.externalCssSource,
        // `null` bypass the required condition if the field is originally nullable
        externalJsSource: atom.externalJsSource ?? undefined,
        externalSourceType: atom.externalSourceType ?? undefined,
        id: atom.id,
        name: atom.name,
        requiredParents: atom.requiredParents,
        suggestedChildren: atom.suggestedChildren,
        tags,
        type: atom.type,
      }),
      [atom, tags],
    )

    return (
      <Form<IUpdateAtomData>
        errorMessage="Error while updating atom"
        model={model}
        onSubmit={atomService.update}
        onSubmitSuccess={onSubmitSuccess}
        schema={updateAtomSchema}
        submitRef={submitRef}
        uiKey={UiKey.AtomFormUpdate}
      >
        <AutoFields omitFields={omitFields} />
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
        <SelectField
          label="Suggested Children"
          name="suggestedChildren"
          options={atomDomainService.getSelectOptions()}
        />
        <SelectField
          label="Required Parents"
          name="requiredParents"
          options={atomDomainService.getSelectOptions()}
        />

        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Update Atom" />
        </DisplayIf>
      </Form>
    )
  },
)
