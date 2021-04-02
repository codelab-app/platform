import React from 'react'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { GetAtomsList } from '../getAtoms'
import { CreateAtomButton } from '../createAtom/CreateAtomButton'

export const PaneMainAtom = () => {
  return (
    <PaneMainTemplate title="Atoms" header={<CreateAtomButton key={0} />}>
      <GetAtomsList />
    </PaneMainTemplate>
  )
}
