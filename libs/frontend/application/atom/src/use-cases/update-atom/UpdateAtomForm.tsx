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
import { AutoField, AutoFields } from 'uniforms-antd'

import { useAtomService } from '../../services'
import { updateAtomSchema } from './update-atom.schema'

interface UpdateAtomFormProps extends IFormController {
  atom: IAtomModel
}

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

    const tagsOptions = tagDomainService.tagsSelectOptions
    const atoms = atomDomainService.getSelectOptions()

    const schema = useMemo(
      () => updateAtomSchema({ atoms: atoms, tags: tagsOptions }),
      [atoms, tags],
    )

    return (
      <Form<IUpdateAtomData>
        errorMessage="Error while updating atom"
        model={model}
        onSubmit={atomService.update}
        onSubmitSuccess={onSubmitSuccess}
        schema={schema}
        submitRef={submitRef}
        uiKey={UiKey.AtomFormUpdate}
      >
        <AutoFields
          omitFields={[
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
          <AutoField name="externalCssSource" />
          <AutoField name="externalJsSource" />
          <AutoField name="externalSourceType" />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Update Atom" />
        </DisplayIf>
      </Form>
    )
  },
)
