'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useAtomService } from '../../services'

export const DeleteAtomsModal = observer<{ id: string }>(({ id }) => {
  const { goToAtomsPage, removeMany } = useAtomService()
  const router = useRouter()
  const atom = useAtomService().getOneFromCache({ id })

  if (!atom) {
    return null
  }

  return (
    <ModalForm.Modal
      okText="Delete Atom"
      onCancel={() => goToAtomsPage(router)}
      open={true}
      title="Delete Confirmation"
      uiKey={UiKey.AtomsModalDelete}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={() => removeMany([atom])}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting atom',
        })}
        onSubmitSuccess={() => goToAtomsPage(router)}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete atom "{atom.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
