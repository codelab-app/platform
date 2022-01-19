import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { DeleteAtomInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useAtomState } from '../../hooks'
import { deleteAtomSchema } from './deleteAtomSchema'
import { useDeleteAtomForm } from './useDeleteAtomForm'

export const DeleteAtomsModal = () => {
  const {
    onSubmit,
    actionType,
    onSubmitError,
    onSubmitSuccess,
    reset,
    isLoading,
    entity,
  } = useDeleteAtomForm()

  return (
    <FormModal
      className="delete-atoms-modal"
      okButtonProps={{ loading: isLoading }}
      okText="Delete Atom"
      onCancel={reset}
      title="Delete Confirmation"
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<DeleteAtomInput>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={deleteAtomSchema}
          submitRef={submitRef}
        >
          <h4>Are you sure you want to delete atom "{entity.name}"?</h4>
          <AutoFields omitFields={['atomId']} />
        </Form>
      )}
    </FormModal>
  )
}
