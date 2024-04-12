import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import {
  CreateFieldModal,
  CreateTypeModal,
  DeleteFieldModal,
  DeleteTypeModal,
  TypeEditor,
  TypesView,
  TypesViewLayout,
  UpdateFieldModal,
  UpdateTypeModal,
} from '@codelab/frontend/application/type'
import { ContentSection } from '@codelab/frontend/presentation/view'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const TypesView: TypesView = observer(() => {
  return (
    <>
      <Head>
        <title>Types | Codelab</title>
      </Head>

      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />
      <CreateTypeModal />
      <DeleteTypeModal />
      <UpdateTypeModal />
      <ContentSection>
        <TypeEditor />
      </ContentSection>
    </>
  )
})

export default TypesView

export const getServerSideProps = withPageAuthRedirect()

TypesView.Layout = TypesViewLayout
