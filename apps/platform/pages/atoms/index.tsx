import { PlusOutlined } from '@ant-design/icons'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  AtomsTable,
  CreateAtomModal,
  DeleteAtomsModal,
  UpdateAtomModal,
} from '@codelab/frontend/domain/atom'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import {
  Header,
  HeaderBreadcrumb,
  HeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const AtomsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  return (
    <>
      <Head>
        <title>Atoms | Codelab</title>
      </Head>

      <CreateAtomModal />
      <UpdateAtomModal />
      <DeleteAtomsModal />

      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />

      <ContentSection>
        <AtomsTable />
      </ContentSection>
    </>
  )
})

const AtomsHeader = observer(() => {
  const { atomService } = useStore()

  const toolbarItems = [
    {
      icon: <PlusOutlined />,
      key: 'create',
      onClick: () => atomService.createModal.open(),
      title: 'Create Atom',
    },
  ]

  return (
    <Header
      direction={<HeaderBreadcrumb items={[{ title: 'Atoms' }]} />}
      logo={
        <Image
          alt="codelab logo"
          css={tw`w-full h-full`}
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={<HeaderToolbar items={toolbarItems} title="My Header Toolbal" />}
    />
  )
})

export default AtomsPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

AtomsPage.Layout = ({ children }) => {
  return (
    <DashboardTemplate Header={AtomsHeader}>{children()}</DashboardTemplate>
  )
}
