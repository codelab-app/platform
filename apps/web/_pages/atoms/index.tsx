import { CreateAtomModal } from '@codelab/frontend-application-atom/use-cases/create-atom'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { AtomForm } from '@codelab/frontend-application-atom/use-cases/get-atoms'
import {
  AtomsViewLayout,
  type IAtomsView,
} from '@codelab/frontend-application-atom/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { CreateFieldModal } from '@codelab/frontend-application-type/use-cases/create-field'
import { DeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AtomsView: IAtomsView = observer(() => {
  return (
    <>
      <Head>
        <title>Atoms | Codelab</title>
      </Head>

      <CreateAtomModal />
      <DeleteAtomsModal />
      <CreateFieldModal />
      <DeleteFieldModal />

      <AtomForm />
    </>
  )
})

export default AtomsView

export const getServerSideProps = withPageAuthRedirect()

AtomsView.Layout = AtomsViewLayout
