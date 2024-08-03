'use client'

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IUpdateTagData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { useTagService } from '../../services'
import { updateTagSchema } from './update-tag.schema'
import { useUpdateTagModal } from './update-tag.state'

export const UpdateTagModal = observer(() => {
  const tagService = useTagService()
  const updateTagModal = useUpdateTagModal()
  const { tagDomainService } = useDomainStore()
  const tag = updateTagModal.data

  const options = tagDomainService.tagsSelectOptions.filter(
    (option) => option.value !== tag?.id,
  )

  const model = {
    id: tag?.id,
    name: tag?.name,
    parent: tag?.parent ? { id: tag.parent.id } : undefined,
  }

  const closeModal = () => updateTagModal.close()

  const onSubmit = (tagDTO: IUpdateTagData) => {
    void tagService.update(tagDTO)

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Update Tag"
      onCancel={closeModal}
      open={updateTagModal.isOpen}
    >
      <ModalForm.Form<IUpdateTagData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating tag',
        })}
        onSubmitSuccess={closeModal}
        schema={updateTagSchema}
        uiKey={MODEL_ACTION.UpdateTag.key}
      >
        <AutoFields omitFields={['id', 'parent']} />

        <SelectField
          label="Parent Tag"
          name="parent.id"
          optionFilterProp="label"
          options={options}
          showSearch
        />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
