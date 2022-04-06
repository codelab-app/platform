import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { WithTagService } from '../../store/tag.service'
import { CreateTagData, createTagSchema } from './createTagSchema'
import { DisplayIfNotRoot } from './DisplayIfNotRoot'

export const CreateTagModal = observer<WithTagService>(({ tagService }) => {
  const onSubmit = (input: CreateTagData) => tagService.create({ ...input })
  // const options = tagService.getAll.map((tag) => ({
  //   label: tag.name,
  //   value: tag.id,
  // }))
  const options = [{ label: '', value: '' }]
  const closeModal = () => tagService.createModal.close()

  return (
    <ModalForm.Modal
      okText="Create Tag"
      onCancel={closeModal}
      visible={tagService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating tag',
        })}
        onSubmitSuccess={closeModal}
        schema={createTagSchema}
      >
        <AutoFields omitFields={['parentTagId']} />
        <DisplayIfNotRoot>
          <SelectField
            label="Parent Tag"
            name="parentTagId"
            optionFilterProp="label"
            options={options}
            required
            showSearch={true}
          />
        </DisplayIfNotRoot>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
