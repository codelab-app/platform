'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { usePageService } from '../../services'

export const DeletePageModal = observer(({ id }: { id: string }) => {
  const pageService = usePageService()
  const router = useRouter()
  const closeModal = () => pageService.deletePopover.close(router)
  const page = pageService.getOneFromCache({ id })

  return (
    <ModalForm.Modal
      okText="Delete Page"
      onCancel={closeModal}
      open={true}
      uiKey={UiKey.PageModalDelete}
    >
      <ModalForm.Form
        errorMessage="Error while deleting page"
        model={{}}
        onSubmit={() => pageService.removeMany(page ? [page] : [])}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete page "{page?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
