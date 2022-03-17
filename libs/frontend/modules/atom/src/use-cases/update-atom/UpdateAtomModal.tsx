import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AtomStore } from '../../store'
import { TreeSelectField } from '../components'
import { UpdateAtomInputSchema, updateAtomSchema } from './updateAtomSchema'

export interface UpdateAtomModalProps {
  atomStore: AtomStore
}

export const UpdateAtomModal = observer<UpdateAtomModalProps>(
  ({ atomStore }) => {
    const closeModal = () => atomStore.updateModal.close()

    const onSubmit = (data: UpdateAtomInputSchema) => {
      if (!atomStore.updateModal.atom) {
        throw new Error('Updated atom is not set')
      }

      return atomStore.updateModal.atom.update(data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating atom',
    })

    const model = {
      name: atomStore.updateModal.atom?.name,
      type: atomStore.updateModal.atom?.type,
      tags: atomStore.updateModal.atom?.tagIds,
    }

    const tagModel = model.tags as Array<string>
    const { data } = useGetTagGraphsQuery()
    const tagTree = useTagTree(data?.tagGraphs)
    const tagTreeData = tagTree.getAntdTrees()

    return (
      <ModalForm.Modal
        okText="Update Atom"
        onCancel={closeModal}
        visible={atomStore.updateModal.isOpen}
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
  },
)
