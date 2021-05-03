import { PaneMainTemplate } from '@codelab/frontend/layout'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateAtomButton, CreateAtomForm } from '../createAtom'
import { DeleteAtomForm } from '../deleteAtom'
import { GetAtomsList } from '../getAtoms'
import { UpdateAtomForm } from '../updateAtom'

export const PaneMainAtom = () => {
  return (
    <PaneMainTemplate title="Atoms" header={<CreateAtomButton key={0} />}>
      <GetAtomsList />
      <CrudModal
        modalProps={{
          className: 'create-atom-modal',
        }}
        entityType={EntityType.Atom}
        actionType={ActionType.Create}
        okText="Create atom"
        renderForm={() => <CreateAtomForm />}
      />
      <CrudModal
        modalProps={{
          className: 'update-atom-modal',
        }}
        entityType={EntityType.Atom}
        actionType={ActionType.Update}
        okText="Update atom"
        renderForm={() => <UpdateAtomForm />}
      />
      <CrudModal
        modalProps={{
          className: 'delete-atom-modal',
        }}
        entityType={EntityType.Atom}
        actionType={ActionType.Delete}
        okText="Delete atom"
        renderForm={() => <DeleteAtomForm />}
      />
    </PaneMainTemplate>
  )
}
