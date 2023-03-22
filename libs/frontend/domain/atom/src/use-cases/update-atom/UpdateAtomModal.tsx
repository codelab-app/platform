import type {
  IAtomService,
  ITagService,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/core'
import { SelectAtom } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { updateAtomSchema } from './update-atom.schema'

export const UpdateAtomModal = observer<{
  atomService: IAtomService
  tagService: ITagService
}>(({ atomService, tagService }) => {
  const atom = atomService.updateModal.atom
  const closeModal = () => atomService.updateModal.close()

  const onSubmit = (atomDTO: IUpdateAtomData) => {
    return atomService.update(atomDTO)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating atom',
  })

  const model = {
    id: atom?.id,
    name: atom?.name,
    requiredParents: atom?.requiredParents.map((child) => child.id),
    suggestedChildren: atom?.suggestedChildren.map(
      (suggestedChild) => suggestedChild.id,
    ),
    tags: atom?.tags,
    type: atom?.type,
  }

  const tagListOption = tagService.tagsSelectOptions

  return (
    <ModalForm.Modal
      okText="Update Atom"
      onCancel={closeModal}
      open={atomService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateAtomData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateAtomSchema}
      >
        <AutoFields
          omitFields={['tags', 'suggestedChildren', 'requiredParents']}
        />
        <SelectField
          label="Connect Tag"
          mode="multiple"
          name="tags"
          optionFilterProp="label"
          options={tagListOption}
          showSearch={true}
        />
        <SelectAtom label="Suggested Children" name="suggestedChildren" />
        <SelectAtom label="Required Parents" name="requiredParents" />
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
