import {
  AtomForm,
  type AtomsView,
  AtomsViewLayout,
  CreateAtomModal,
  DeleteAtomsModal,
} from '@codelab/frontend/application/atom'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import {
  CreateFieldModal,
  DeleteFieldModal,
} from '@codelab/frontend/application/type'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AtomsView: AtomsView = observer(() => {
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
