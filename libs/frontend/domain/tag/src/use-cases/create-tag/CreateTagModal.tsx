import type {
  ICreateTagData,
  ITagService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createTagSchema } from './createTagSchema'

export const CreateTagModal = observer<{
  tagService: ITagService
  userService: IUserService
}>(({ tagService, userService }) => {
  const onSubmit = (input: ICreateTagData) => {
    return tagService.create(input)
  }

  const options = tagService.tagsSelectOptions
  const defaultOption = tagService.selectedOption
  const closeModal = () => tagService.createModal.close()

  console.log(options)

  return (
    <ModalForm.Modal
      okText="Create Tag"
      onCancel={closeModal}
      open={tagService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{
          id: v4(),
          owner: { auth0Id: userService.user?.auth0Id },
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
        <SelectField
          label="Parent Tag"
          name="parent.id"
          optionFilterProp="label"
          options={options}
          showSearch
        />
        {/* </DisplayIfNotRoot> */}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
