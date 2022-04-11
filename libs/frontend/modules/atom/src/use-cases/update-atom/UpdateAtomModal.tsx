import { WithTagService } from '@codelab/frontend/modules/tag'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IUpdateAtomDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { WithAtomService } from '../../store'
import { updateAtomSchema } from './updateAtomSchema'

type UpdateAtomModalProps = WithAtomService & WithTagService

export const UpdateAtomModal = observer<UpdateAtomModalProps>(
  ({ atomService, tagService }) => {
    const atom = atomService.updateModal.atom
    const closeModal = () => atomService.updateModal.close()

    const onSubmit = (data: IUpdateAtomDTO) => {
      if (!atom) {
        throw new Error('Updated atom is not set')
      }

      return atomService.update(atom, data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating atom',
    })

    const model = {
      name: atom?.name,
      type: atom?.type,
      tags: atom?.tags.map((tag) => tag.id),
    }

    const tagListOption = tagService.tagsListOptions

    return (
      <ModalForm.Modal
        okText="Update Atom"
        onCancel={closeModal}
        visible={atomService.updateModal.isOpen}
      >
        <ModalForm.Form<IUpdateAtomDTO>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updateAtomSchema}
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
