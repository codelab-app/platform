import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth/guards'
import { CreateFieldModal } from '@codelab/frontend-application-type/use-cases/create-field'
import { CreateTypeModal } from '@codelab/frontend-application-type/use-cases/create-type'
import { DeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { DeleteTypeModal } from '@codelab/frontend-application-type/use-cases/delete-type'
import { TypeEditor } from '@codelab/frontend-application-type/use-cases/get-types'
import { UpdateFieldModal } from '@codelab/frontend-application-type/use-cases/update-field'
import { UpdateTypeModal } from '@codelab/frontend-application-type/use-cases/update-type'
import {
  type TypesView,
  TypesViewLayout,
} from '@codelab/frontend-application-type/views'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
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
