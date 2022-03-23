import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AtomService, WithAtomService } from '../../store'
import { TreeSelectField } from '../components'
import { UpdateAtomInputSchema, updateAtomSchema } from './updateAtomSchema'

export const UpdateAtomModal = observer<WithAtomService>(({ atomService }) => {
  const atom = atomService.updateModal.atom
  const closeModal = () => atomService.updateModal.close()

  const onSubmit = (data: UpdateAtomInputSchema) => {
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
    tags: atom?.tagIds,
  }

  const tagModel = model.tags as Array<string>
  const { data } = useGetTagGraphsQuery()
  const tagTree = useTagTree(data?.tagGraphs)
  const tagTreeData = tagTree.getAntdTrees()

  return (
    <ModalForm.Modal
      okText="Update Atom"
      onCancel={closeModal}
      visible={atomService.updateModal.isOpen}
    >
      <ModalForm.Form<UpdateAtomInputSchema>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateAtomSchema}
      >
        <AutoFields omitFields={['tags']} />
        <TreeSelectField
          label="Tags"
          name="tags"
          treeData={tagTreeData}
          value={tagModel}
        />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
