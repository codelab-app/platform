import { MainPaneTemplate } from '@codelab/frontend/layout'
import React from 'react'
import { CreateAtomTypeButton, CreateAtomTypeModal } from '../createAtomType'
import { DeleteAtomTypesModal } from '../deleteAtomType'
import { UpdateAtomTypeModal } from '../updateAtomType'

export const MainPaneAtomType = () => {
  return (
    <MainPaneTemplate
      title="AtomTypes"
      header={<CreateAtomTypeButton key={0} />}
    >
      <CreateAtomTypeModal />
      <UpdateAtomTypeModal />
      <DeleteAtomTypesModal />
    </MainPaneTemplate>
  )
}
