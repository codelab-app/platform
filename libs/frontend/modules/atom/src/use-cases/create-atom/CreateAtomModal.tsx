import { useUser } from '@auth0/nextjs-auth0'
import { WithTagService } from '@codelab/frontend/modules/tag'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { WithAtomService } from '../../store'
import { CreateAtomInputSchema, createAtomSchema } from './createAtomSchema'

type CreateAtomModalProps = WithAtomService & WithTagService

export const CreateAtomModal = observer<CreateAtomModalProps>(
  ({ atomService, tagService }) => {
    const closeModal = () => atomService.createModal.close()
    const { user } = useUser()
    // const { data } = useGetTagGraphsQuery()
    // const tagTree = useTagTree(data?.tagGraphs)
    // const tagTreeData = tagTree.getAntdTrees()

    const onSubmit = (input: CreateAtomInputSchema) => {
      return atomService.create(input, user?.sub)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating atom',
    })

    // TODO: need to replace with tagService.selectOption
    const tagListOption = [
      { label: 'root-11', value: 'ca59fe32-f408-4bef-9b99-1647bd1412ea' },
      { label: 'level-2', value: '4a67380b-dd5b-4fc3-9ef8-51a8b13b8036' },
      { label: 'sdf', value: '4be3ac25-7f01-4ab5-b3d9-7dc7fe285b6b' },
    ]

    return (
      <ModalForm.Modal
        okText="Create Atom"
        onCancel={closeModal}
        visible={atomService.createModal.isOpen}
      >
        <ModalForm.Form<CreateAtomInputSchema>
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
