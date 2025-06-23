'use client'

import { UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useAtomService } from '../../services'

export const DeleteAtomsModal = observer<{ id: string }>(({ id }) => {
  const { goToAtomsPage, removeMany } = useAtomService()
  const router = useRouter()
  const { atomDomainService } = useDomainStore()
  const atom = atomDomainService.atoms.get(id)

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
        errorMessage="Error while deleting atom"
        model={{}}
        onSubmit={() => removeMany([atom])}
        onSubmitSuccess={() => goToAtomsPage(router)}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete atom "{atom.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
