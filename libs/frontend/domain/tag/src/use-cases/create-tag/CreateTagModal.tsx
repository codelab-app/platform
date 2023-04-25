import type { ICreateTagData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createTagSchema } from './create.tag.schema'

export const CreateTagModal = observer(() => {
  const { tagService, userService } = useStore()
  const isOpen = tagService.createModal.isOpen

  const onSubmit = (input: ICreateTagData) => {
    return tagService.create(input)
  }

  const defaultOption = tagService.selectedOption
  const closeModal = () => tagService.createModal.close()

  return (
    <ModalForm.Modal okText="Create Tag" onCancel={closeModal} open={isOpen}>
      <ModalForm.Form
        model={{
          id: v4(),
          owner: { auth0Id: userService.user.auth0Id },
          parent: { id: defaultOption.value.toString() },
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating tag',
        })}
        onSubmitSuccess={closeModal}
        schema={createTagSchema}
      >
        <AutoFields omitFields={['parent']} />
        {/* <DisplayIfNotRoot> */}
        <AutoField label="Parent Tag" name="parent.id" />
        {/* </DisplayIfNotRoot> */}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
