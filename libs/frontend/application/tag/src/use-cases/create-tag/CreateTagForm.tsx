'use client'

import type { ICreateTagData } from '@codelab/shared-abstract-core'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { useUser } from '@codelab/frontend-application-user/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useTagService } from '../../services'
import { createTagSchema } from './create.tag.schema'

export const CreateTagForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const user = useUser()
    const tagService = useTagService()
    const { tagDomainService } = useDomainStore()
    const onSubmit = (input: ICreateTagData) => tagService.create(input)
    const selectedOption = tagDomainService.selectedOption

    const model = {
      id: v4(),
      owner: { id: user.id },
      parent: selectedOption
        ? { id: selectedOption.value.toString() }
        : undefined,
    } as ICreateTagData

    const tags = tagDomainService.tagsSelectOptions

    const schema = useMemo(() => createTagSchema({ tags }), [tags])

    return (
      <Form<ICreateTagData>
        errorMessage="Error while creating tag"
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={schema}
        submitRef={submitRef}
        uiKey={UiKey.TagFormCreate}
      >
        <AutoFields omitFields={['parent', 'owner']} />
        {model.parent && <AutoField name="parent.id" />}
        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Create Tag" />
        </DisplayIf>
      </Form>
    )
  },
)
