import type { ICreateTagData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import type { LabeledValue } from 'antd/es/select'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createTagSchema } from './create.tag.schema'

export const CreateTagModal = observer(() => {
  const { tagService, userService } = useStore()
  const [options, setOptions] = useState<Array<LabeledValue>>([])
  const isOpen = tagService.createModal.isOpen

  const onSubmit = (input: ICreateTagData) => {
    return tagService.create(input)
  }

  /**
   * Get the options only when modal is opened (or closed)
   * otherwise of tagService.tagsSelectOptions is directly
   * used mobx will rerender the entire component on submit
   * as we update local cache first.
   */
  useEffect(() => {
    setOptions(tagService.tagsSelectOptions)
  }, [tagService, isOpen])

  const defaultOption = tagService.selectedOption
  const closeModal = () => tagService.createModal.close()

  return (
    <ModalForm.Modal okText="Create Tag" onCancel={closeModal} open={isOpen}>
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
