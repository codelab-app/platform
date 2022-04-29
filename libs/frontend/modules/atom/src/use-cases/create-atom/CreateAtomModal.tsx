import {
  ATOM_SERVICE,
  TAG_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateAtomDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { createAtomSchema } from './createAtomSchema'

export const CreateAtomModal = observer<
  WithServices<ATOM_SERVICE | TAG_SERVICE | USER_SERVICE>
>(({ atomService, tagService, userService }) => {
  const closeModal = () => atomService.createModal.close()

  const onSubmit = (data: ICreateAtomDTO) => {
    return atomService.create([data])
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating atom',
  })

  const tagsSelectionOptions = tagService.tagsSelectOptions

  return (
    <ModalForm.Modal
      okText="Create Atom"
      onCancel={closeModal}
      visible={atomService.createModal.isOpen}
    >
      <ModalForm.Form<ICreateAtomDTO>
        model={{
          owner: userService.user?.auth0Id,
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
