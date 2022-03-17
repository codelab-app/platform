import { useUser } from '@auth0/nextjs-auth0'
import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AtomStore } from '../../store'
import { TreeSelectField } from '../components'
import { CreateAtomInputSchema, createAtomSchema } from './createAtomSchema'

export interface CreateAtomModalProps {
  atomStore: AtomStore
}

export const CreateAtomModal = observer<CreateAtomModalProps>(
  ({ atomStore }) => {
    const closeModal = () => atomStore.createModal.close()
    const { user } = useUser()
    const { data } = useGetTagGraphsQuery()
    const tagTree = useTagTree(data?.tagGraphs)
    const tagTreeData = tagTree.getAntdTrees()

    const onSubmit = (input: CreateAtomInputSchema) =>
      atomStore.createAtom(input, user?.sub)

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating atom',
    })

    return (
      <ModalForm.Modal
        okText="Create Atom"
        onCancel={closeModal}
        visible={atomStore.createModal.isOpen}
      >
        <ModalForm.Form<CreateAtomInputSchema>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createAtomSchema}
        >
          <AutoFields omitFields={['tags']} />
          <TreeSelectField label="Tags" name="tags" treeData={tagTreeData} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
