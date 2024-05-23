import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend-presentation-view/components'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { ICreateTagData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createTagSchema } from './create.tag.schema'

export const CreateTagModal = observer(() => {
  const { tagService } = useStore()
  const isOpen = tagService.createModal.isOpen

  const onSubmit = (input: ICreateTagData) => {
    void tagService.create(input)

    closeModal()

    return Promise.resolve()
  }

  const defaultOption = tagService.tagDomainService.selectedOption
  const closeModal = () => tagService.createModal.close()

  return (
    <ModalForm.Modal okText="Create Tag" onCancel={closeModal} open={isOpen}>
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
        uiKey={MODEL_ACTION.CreateTag.key}
      >
        <AutoFields omitFields={['parent']} />
        <AutoField label="Parent Tag" name="parent.id" />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
