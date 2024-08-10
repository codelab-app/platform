'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import type { IUpdateTagData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { useTagService } from '../../services'
import { updateTagSchema } from './update-tag.schema'
import { useUpdateTagForm } from './update-tag.state'

export const UpdateTagForm = observer(() => {
  const tagService = useTagService()
  const { tagDomainService } = useDomainStore()
  const updateTagForm = useUpdateTagForm()
  const tag = updateTagForm.data

  const options = tagDomainService.tagsSelectOptions.filter(
    (option) => option.value !== tag?.id,
  )

  const model = {
    id: tag?.id,
    name: tag?.name,
    parent: tag?.parent ? { id: tag.parent.id } : undefined,
  }

  const onSubmit = (tagDto: IUpdateTagData) => {
    void tagService.update(tagDto)

    return Promise.resolve()
  }

  return tag ? (
    <Form<IUpdateTagData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createFormErrorNotificationHandler({
        title: 'Error while updating tag',
      })}
      schema={updateTagSchema}
      uiKey={UiKey.UpdateTagForm}
    >
      <AutoFields omitFields={['id', 'parent']} />

      <SelectField
        label="Parent Tag"
        name="parent.id"
        optionFilterProp="label"
        options={options}
        showSearch
      />

      <FormController submitLabel="Update Tag" />
    </Form>
  ) : null
})
