import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateTagDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { WithTagService } from '../../store/tag.service'
import { createTagSchema } from './createTagSchema'

export const CreateTagModal = observer<WithTagService>(({ tagService }) => {
  const { user } = useUser()

  const onSubmit = (input: ICreateTagDTO) => {
    if (!user?.sub) {
      throw new Error('Missing user sub')
    }

    return tagService.create({ ...input }, user?.sub)
  }

  // const options = tagService.getAll.map((tag) => ({
  //   label: tag.name,
  //   value: tag.id,
  // }))
  const options = tagService.tagsListOptions
  const defaultOption = tagService.seletedTagOption
  const closeModal = () => tagService.createModal.close()

  return (
    <ModalForm.Modal
      okText="Create Tag"
      onCancel={closeModal}
      visible={tagService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{
          parentTagId: defaultOption?.value,
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating tag',
        })}
        onSubmitSuccess={closeModal}
        schema={createTagSchema}
      >
        <AutoFields omitFields={['parentTagId']} />
        {/* <DisplayIfNotRoot>*/}
        <SelectField
          label="Parent Tag"
          name="parentTagId"
          optionFilterProp="label"
          options={options}
          showSearch
        />
        {/* </DisplayIfNotRoot>*/}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
