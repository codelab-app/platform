'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useAtomService } from '../../services'

export const DeleteAtomsModal = observer<{ atom: IAtomModel }>(({ atom }) => {
  const { goToAtomsPage, removeMany } = useAtomService()
  const onSubmit = () => removeMany([atom])

  return (
    <ModalForm.Modal
      okText="Delete Atom"
      onCancel={() => goToAtomsPage()}
      open={true}
      title="Delete Confirmation"
      uiKey={UiKey.AtomsModalDelete}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting atom',
        })}
        onSubmitSuccess={() => goToAtomsPage()}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete atom "{atom.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
