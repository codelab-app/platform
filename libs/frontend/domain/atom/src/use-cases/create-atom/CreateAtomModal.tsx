import type { ICreateAtomData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAtomSchema } from './create-atom.schema'

export const CreateAtomModal = observer(() => {
  const { atomService, tagService, userService } = useStore()
  const closeModal = () => atomService.createModal.close()

  const onSubmit = (data: ICreateAtomData) => {
    return atomService.create(data)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating atom',
  })

  const tagsSelectionOptions = tagService.tagsSelectOptions

  return (
    <ModalForm.Modal
      okText="Create Atom"
      onCancel={closeModal}
      open={atomService.createModal.isOpen}
    >
      <ModalForm.Form<ICreateAtomData>
        model={{
          id: v4(),
          owner: { auth0Id: userService.user?.auth0Id },
        }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createAtomSchema}
      >
        <AutoFields omitFields={['tags']} />
        <SelectField
          label="Connect Tag"
          mode="multiple"
          name="tags"
          optionFilterProp="label"
          options={tagsSelectionOptions}
          showSearch={true}
        />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
