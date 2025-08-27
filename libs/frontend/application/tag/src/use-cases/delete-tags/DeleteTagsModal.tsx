'use client'

import type { ITagModel } from '@codelab/frontend-abstract-domain'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useTagService } from '../../services'

export const DeleteTagsModal = observer<{ tags: Array<ITagModel> }>(
  ({ tags }) => {
    const router = useRouter()
    const tagService = useTagService()
    const closeModal = () => router.push(RoutePaths.Tag.base())
    const onSubmit = async () => tagService.removeMany(tags)

    const tagsNames = tags.map((tag) => tag.name).join(', ')

    return (
      <ModalForm.Modal
        okText="Delete Tags"
        onCancel={closeModal}
        open={tags.length > 0}
        title={<span className="font-semibold">Delete tags</span>}
        uiKey={UiKey.TagModalDelete}
      >
        <ModalForm.Form
          errorMessage="Error while deleting tags"
          model={{ ids: tags.map(({ id }) => id) }}
          onSubmit={onSubmit}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>Are you sure you want to delete "{tagsNames}"?</h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
