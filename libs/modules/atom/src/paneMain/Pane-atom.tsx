import React from 'react'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { GetAtomsList } from '../getAtoms'
import { CrudModal, EntityType, ActionType } from '@codelab/frontend/shared'
import { CreateAtomButton, CreateAtomForm } from '../createAtom'
import { UpdateAtomForm } from '../updateAtom'
import { DeleteAtomForm } from '../deleteAtom'

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
