import type {
  IAtomService,
  ITagService,
  IUpdateAtomDTO,
} from '@codelab/frontend/abstract/core'
import { SelectAtom } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { updateAtomSchema } from './updateAtomSchema'

export const UpdateAtomModal = observer<{
  atomService: IAtomService
  tagService: ITagService
}>(({ atomService, tagService }) => {
  const atom = atomService.updateModal.atom
  const closeModal = () => atomService.updateModal.close()

  const onSubmit = (atomDTO: IUpdateAtomDTO) => {
    return atomService.update(atomDTO)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating atom',
  })

  const model = {
    name: atom?.name,
    type: atom?.type,
    tags: atom?.tags.map((tag) => tag.id),
    allowedChildren: atom?.allowedChildren.map(
      (allowedChild) => allowedChild.id,
    ),
  }

  const tagListOption = tagService.tagsSelectOptions

  return (
    <ModalForm.Modal
      okText="Update Atom"
      onCancel={closeModal}
      open={atomService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateAtomDTO>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateAtomSchema}
      >
        <AutoFields omitFields={['tags', 'allowedChildren']} />
        <SelectField
          label="Connect Tag"
          mode="multiple"
          name="tags"
          optionFilterProp="label"
          options={tagListOption}
          showSearch={true}
        />
        <SelectAtom label="Allowed Children" name="allowedChildren" />
        {/* <SelectField */}
        {/*  label="Allowed Children" */}
        {/*  mode="multiple" */}
        {/*  name="allowedChildren" */}
        {/*  optionFilterProp="label" */}
        {/*  options={tagListOption} */}
        {/*  showSearch={true} */}
        {/*/ > */}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
