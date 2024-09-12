'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { ICreateTagData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useTagService } from '../../services'
import { createTagSchema } from './create.tag.schema'
import { useCreateTagModal } from './create-tag.data'

export const CreateTagModal = observer(() => {
  const tagService = useTagService()
  const { tagDomainService } = useDomainStore()
  const createTagModal = useCreateTagModal()
  const isOpen = createTagModal.isOpen

  const onSubmit = (input: ICreateTagData) => {
    void tagService.create(input)

    closeModal()

    return Promise.resolve()
  }

  const defaultOption = tagDomainService.selectedOption
  const closeModal = () => createTagModal.close()

  return (
    <ModalForm.Modal
      okText="Create Tag"
      onCancel={closeModal}
      open={isOpen}
      uiKey={UiKey.CreateTagModal}
    >
      <ModalForm.Form
        model={{
          id: v4(),
          parent: defaultOption ? { id: defaultOption.value.toString() } : null,
        }}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating tag',
        })}
        onSubmitSuccess={closeModal}
        schema={createTagSchema}
      >
        <AutoFields omitFields={['parent']} />
        <AutoField label="Parent Tag" name="parent.id" />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
