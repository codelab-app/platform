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
import { useMemo } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useAtomService } from '../../services'
import { createAtomSchema } from './create-atom.schema'

export const CreateAtomForm = observer<IFormController>(
  ({ onSubmitSuccess, submitRef }) => {
    const { tagDomainService } = useDomainStore()
    const atomService = useAtomService()
    const { atomDomainService } = useDomainStore()
    const tags = tagDomainService.tagsSelectOptions
    const atoms = atomDomainService.getSelectOptions()

    const schema = useMemo(
      () => createAtomSchema({ atoms: atoms, tags }),
      [atoms, tags],
    )

    const model = {
      id: v4(),
    } as ICreateAtomData
    return (
      <Form<ICreateAtomData>
        errorMessage="Error while creating atom"
        model={model}
        onSubmit={atomService.create}
        onSubmitSuccess={onSubmitSuccess}
        schema={schema}
        submitRef={submitRef}
        uiKey={UiKey.AtomFormCreate}
      >
        <AutoFields
          omitFields={[
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
          <AutoField name="externalCssSource" />
          <AutoField name="externalJsSource" />
          <AutoField name="externalSourceType" />
        </DisplayIfField>
      </Form>
    )
  },
)
