'use client'

import type { ICreateAtomData } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'

import {
  type IFormController,
  type SubmitController,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  DisplayIfField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { IAtomType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoField, AutoFields, SelectField, TextField } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useAtomService } from '../../services'
import { createAtomSchema } from './create-atom.schema'

export const CreateAtomForm = observer<IFormController>(
  ({ onSubmitSuccess, submitRef }) => {
    const { tagDomainService } = useDomainStore()
    const { create } = useAtomService()
    const { back } = useRouter()
    const closeForm = () => back()

    const onSubmit = async (data: ICreateAtomData) => {
      const results = await create(data)

      onSubmitSuccess?.()

      return results
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
        uiKey={UiKey.AtomFormCreate}
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
      </Form>
    )
  },
)
