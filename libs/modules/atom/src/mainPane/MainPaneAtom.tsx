import { MainPaneTemplate } from '@codelab/frontend/layout'
import React from 'react'
import { CreateAtomButton, CreateAtomModal } from '../createAtom'
import { DeleteAtomsModal } from '../deleteAtom'
import { GetAtomsList } from '../getAtoms'
import { UpdateAtomModal } from '../updateAtom'

export const MainPaneAtom = () => {
  return (
    <MainPaneTemplate title="Atoms" header={<CreateAtomButton key={0} />}>
      <GetAtomsList />
      <CreateAtomModal />
      <UpdateAtomModal />
      <DeleteAtomsModal />
    </MainPaneTemplate>
  )
}
