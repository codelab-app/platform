import { useUser } from '@auth0/nextjs-auth0'
import { WithTagService } from '@codelab/frontend/modules/tag'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateAtomDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { WithAtomService } from '../../store'
import { createAtomSchema } from './createAtomSchema'

type CreateAtomModalProps = WithAtomService & WithTagService

export const CreateAtomModal = observer<CreateAtomModalProps>(
  ({ atomService, tagService }) => {
    const closeModal = () => atomService.createModal.close()
    const { user } = useUser()

    const onSubmit = (input: ICreateAtomDTO) => {
      const ownerId = user?.sub

      if (!ownerId) {
        throw new Error('Invalid ownerId')
      }

      return atomService.create(input, ownerId)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating atom',
    })

    const tagListOption = tagService.tagsListOptions

    return (
      <ModalForm.Modal
        okText="Create Atom"
        onCancel={closeModal}
        visible={atomService.createModal.isOpen}
      >
        <ModalForm.Form<ICreateAtomDTO>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createAtomSchema}
        >
          <AutoFields omitFields={['tags']} />
          <SelectField
            label="Connecte Tag"
            mode="multiple"
            name="tags"
            optionFilterProp="label"
            options={tagListOption}
            showSearch={true}
          />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
