'use client'

import type { ICreateAtomData } from '@codelab/frontend-abstract-domain'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  DisplayIfField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { IAtomType } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { AutoFields, SelectField, TextField } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useAtomService } from '../../services'
import { createAtomSchema } from './create-atom.schema'

export const CreateAtomForm = observer<IFormController>(
  ({ onSubmitSuccess, submitRef }) => {
    const { tagDomainService } = useDomainStore()
    const atomService = useAtomService()
    const { atomDomainService } = useDomainStore()
    const tagsSelectionOptions = tagDomainService.tagsSelectOptions

    return (
      <Form<ICreateAtomData>
        errorMessage="Error while creating atom"
        model={
          {
            id: v4(),
          } as ICreateAtomData
        }
        onSubmit={atomService.create}
        onSubmitSuccess={onSubmitSuccess}
        schema={createAtomSchema}
        submitRef={submitRef}
        uiKey={UiKey.AtomFormCreate}
      >
        <AutoFields
          omitFields={[
            'tags',
            'requiredParents',
            'suggestedChildren',
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
        <SelectField
          label="Required Parents"
          name="requiredParents"
          options={atomDomainService.getSelectOptions()}
        />
        <SelectField
          label="Connect Tag"
          mode="multiple"
          name="tags"
          optionFilterProp="label"
          options={tagsSelectionOptions}
          showSearch={true}
        />
      </Form>
    )
  },
)
