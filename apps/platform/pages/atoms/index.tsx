import { type CodelabPage, PageType } from '@codelab/frontend/abstract/types'
import {
  AtomForm,
  AtomsPrimarySidebar,
  CreateAtomModal,
  DeleteAtomsModal,
} from '@codelab/frontend/domain/atom'
import {
  CreateFieldModal,
  DeleteFieldModal,
} from '@codelab/frontend/domain/type'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation//codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DashboardTemplate } from '@codelab/frontend/presentation/view'
import { withPageAuthRedirect } from '@codelab/frontend/shared/utils'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AtomsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
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

const AtomsHeader = observer(() => {
  return (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={[{ title: 'Atoms' }]} />}
      logo={
        <Image
          alt="codelab logo"
          className="h-full w-full"
          preview={false}
          src="/logo.png"
        />
      }
    />
  )
})

export default AtomsPage

export const getServerSideProps = withPageAuthRedirect()

AtomsPage.Layout = ({ children }) => {
  return (
    <DashboardTemplate
      Header={AtomsHeader}
      PrimarySidebar={{
        default: PageType.Atoms,
        items: [
          {
            key: PageType.Atoms,
            render: AtomsPrimarySidebar,
          },
        ],
      }}
    >
      {children()}
    </DashboardTemplate>
  )
}
