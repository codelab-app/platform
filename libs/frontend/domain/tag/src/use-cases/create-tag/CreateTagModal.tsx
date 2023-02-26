import type {
  ICreateTagDTO,
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
  const onSubmit = (input: ICreateTagDTO) => {
    return tagService.createSubmit([input])
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
          parentTag: { id: defaultOption.value.toString() },
          owner: { auth0Id: userService.user?.auth0Id },
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating tag',
        })}
        onSubmitSuccess={closeModal}
        schema={createTagSchema}
      >
        <AutoFields omitFields={['parentTag']} />
        {/* <DisplayIfNotRoot> */}
        <SelectField
          label="Parent Tag"
          name="parentTag.id"
          optionFilterProp="label"
          options={options}
          showSearch
        />
        {/* </DisplayIfNotRoot> */}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
