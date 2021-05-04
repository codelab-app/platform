import { MainPaneTemplate } from '@codelab/frontend/layout'
import React from 'react'
import { CreateAtomTypeButton } from '../createAtomType'

export const MainPaneAtomType = () => {
  return (
    <MainPaneTemplate
      title="AtomTypes"
      header={<CreateAtomTypeButton key={0} />}
    >
      <></>
    </MainPaneTemplate>
  )
}
