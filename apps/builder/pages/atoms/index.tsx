import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { AtomLibrary } from '@codelab/frontend/domain/atom'
import {
  AtomsTable,
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  UpdateAtomModal,
} from '@codelab/frontend/domain/atom'
import {
  antdAtoms,
  codelabAtoms,
  htmlAtoms,
  muiAtoms,
  reactAtoms,
} from '@codelab/frontend/domain/renderer'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import tw from 'twin.macro'

const AtomsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const htmlAtomsKeys = useMemo(() => Object.keys(htmlAtoms), [])
  const muiAtomsKeys = useMemo(() => Object.keys(muiAtoms), [])
  const antdAtomsKeys = useMemo(() => Object.keys(antdAtoms), [])
  const clAtomsKeys = useMemo(() => Object.keys(codelabAtoms), [])
  const reactAtomsKeys = useMemo(() => Object.keys(reactAtoms), [])

  const {
    query: { page, pageSize },
  } = useRouter()

  const getAtomLibrary = useCallback(
    (atomType: string): AtomLibrary => {
      return htmlAtomsKeys.includes(atomType)
        ? { color: 'orange', name: 'HTML' }
        : antdAtomsKeys.includes(atomType)
        ? { color: 'geekblue', name: 'Ant Design' }
        : muiAtomsKeys.includes(atomType)
        ? { color: 'purple', name: 'Material UI' }
        : clAtomsKeys.includes(atomType)
        ? { color: 'yellow', name: 'Codelab' }
        : reactAtomsKeys.includes(atomType)
        ? { color: 'green', name: 'React' }
        : { color: 'black', name: 'Unknown' }
    },
    [htmlAtomsKeys, antdAtomsKeys, muiAtomsKeys, clAtomsKeys, reactAtomsKeys],
  )

  return (
    <>
      <Head>
        <title>Atoms | Codelab</title>
      </Head>

      <CreateAtomModal
        atomService={store.atomService}
        tagService={store.tagService}
        userService={store.userService}
      />
      <UpdateAtomModal
        atomService={store.atomService}
        tagService={store.tagService}
      />
      <DeleteAtomsModal atomService={store.atomService} />
      <CreateFieldModal
        fieldService={store.fieldService}
        typeService={store.typeService}
      />
      <UpdateFieldModal
        fieldService={store.fieldService}
        typeService={store.typeService}
      />
      <DeleteFieldModal fieldService={store.fieldService} />
      <ContentSection>
        <AtomsTable
          atomService={store.atomService}
          fieldService={store.fieldService}
          getAtomLibrary={getAtomLibrary}
          page={page ? parseInt(page as string) : undefined}
          pageSize={pageSize ? parseInt(pageSize as string) : undefined}
          typeService={store.typeService}
        />
      </ContentSection>
    </>
  )
})

const Header = () => {
  const store = useStore()

  const pageHeaderButtons = [
    <div
      css={tw`flex flex-row items-center justify-center gap-2`}
      key="export_import"
    >
      <CreateAtomButton atomService={store.atomService} key="create" />
    </div>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Atom" />
}

export default AtomsPage

export const getServerSideProps = auth0Instance.withPageAuthRequired()

AtomsPage.Layout = (page) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      Header={Header}
      sidebarNavigation={{
        primaryItems: [
          appMenuItem,
          allPagesMenuItem(appId),
          pageBuilderMenuItem(appId, pageId),
          resourceMenuItem,
        ],
        secondaryItems: adminMenuItems,
      }}
    >
      {page.children}
    </DashboardTemplate>
  )
}
