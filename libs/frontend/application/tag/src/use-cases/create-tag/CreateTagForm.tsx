'use client'

import type { ICreateTagData } from '@codelab/shared/abstract/core'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useTagService } from '../../services'
import { createTagSchema } from './create.tag.schema'

export const CreateTagForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const tagService = useTagService()
    const { tagDomainService } = useDomainStore()
    const onSubmit = (input: ICreateTagData) => tagService.create(input)
    const selectedOption = tagDomainService.selectedOption

    const model = {
      id: v4(),
      parent: selectedOption
        ? { id: selectedOption.value.toString() }
        : undefined,
    }

    return (
      <Form<ICreateTagData>
        errorMessage="Error while creating tag"
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={createTagSchema}
        submitRef={submitRef}
        uiKey={UiKey.TagFormCreate}
      >
        <AutoFields omitFields={['parent']} />
        {model.parent && <AutoField label="Parent Tag" name="parent.id" />}
        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Create Tag" />
        </DisplayIf>
      </Form>
    )
  },
)
