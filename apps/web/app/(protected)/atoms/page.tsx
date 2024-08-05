import { CreateAtomModal } from '@codelab/frontend-application-atom/use-cases/create-atom'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { AtomForm } from '@codelab/frontend-application-atom/use-cases/get-atoms'
import { CreateFieldModal } from '@codelab/frontend-application-type/use-cases/create-field'
import { DeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Atoms | Codelab',
}

const AtomsRoute = () => {
  return (
    <>
      <CreateAtomModal />
      <DeleteAtomsModal />
      <CreateFieldModal />
      <DeleteFieldModal />

      <AtomForm />
    </>
  )
}

export default AtomsRoute
