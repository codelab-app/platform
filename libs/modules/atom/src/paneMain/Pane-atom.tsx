import React from 'react'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { GetAtomsList } from '../getAtoms'
import { CrudModal, EntityType, FormType } from '@codelab/frontend/shared'
import { CreateAtomButton, CreateAtomForm } from '../createAtom'
import { UpdateAtomForm } from '../updateAtom'
import { DeleteAtomForm } from '../deleteAtom'

export const PaneMainAtom = () => {
  return (
    <PaneMainTemplate title="Atoms" header={<CreateAtomButton key={0} />}>
      <GetAtomsList />
      <CrudModal
        entityType={EntityType.Atom}
        actionType={FormType.Create}
        okText="Create atom"
        renderForm={() => <CreateAtomForm />}
      />
      <CrudModal
        entityType={EntityType.Atom}
        actionType={FormType.Update}
        okText="Update atom"
        renderForm={() => <UpdateAtomForm />}
      />
      <CrudModal
        entityType={EntityType.Atom}
        actionType={FormType.Delete}
        okText="Delete atom"
        renderForm={() => <DeleteAtomForm />}
      />
    </PaneMainTemplate>
  )
}
