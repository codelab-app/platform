'use client'

import type { ITagModel } from '@codelab/frontend/abstract/domain'

import { NewRoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields, ListField } from 'uniforms-antd'

import type { DeleteTagsData } from './delete-tags.schema'

import { useTagService } from '../../services'
import { deleteTagsSchema } from './delete-tags.schema'

export const DeleteTagsModal = observer<{ tags: Array<ITagModel> }>(
  ({ tags }) => {
    const router = useRouter()
    const tagService = useTagService()
    const closeModal = () => router.push(NewRoutePaths.Tag.base())
    const onSubmit = async () => tagService.removeMany(tags)

    return (
      <ModalForm.Modal
        okText="Delete Tags"
        onCancel={closeModal}
        open={tags.length > 0}
        title={<span className="font-semibold">Delete tags</span>}
        uiKey={UiKey.TagModalDelete}
      >
        <ModalForm.Form<DeleteTagsData>
          errorMessage="Error while deleting tags"
          model={{}}
          onSubmit={onSubmit}
          onSubmitSuccess={closeModal}
          schema={deleteTagsSchema}
        >
          Are you sure you want to delete{' '}
          {tags.map((tag) => tag.name).join(', ')}
          ?
          <AutoFields omitFields={['ids']} />
          <ListField hidden={true} itemProps={{}} name="ids" />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
