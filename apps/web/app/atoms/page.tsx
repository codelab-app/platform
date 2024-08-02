import { CreateAtomModal } from '@codelab/frontend-application-atom/use-cases/create-atom'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { AtomForm } from '@codelab/frontend-application-atom/use-cases/get-atoms'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { CreateFieldModal } from '@codelab/frontend-application-type/use-cases/create-field'
import { DeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { observer } from 'mobx-react-lite'
import type { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Atoms | Codelab',
}

const AtomsRoute = observer(() => {
  return (
    <>
      <CreateAtomModal />
      <DeleteAtomsModal />
      <CreateFieldModal />
      <DeleteFieldModal />

      <AtomForm />
    </>
  )
})

export default AtomsRoute
