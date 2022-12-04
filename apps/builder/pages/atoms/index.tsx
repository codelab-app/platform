import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  AtomLibrary,
  AtomRecord,
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  GetAtomsTable,
  UpdateAtomModal,
} from '@codelab/frontend/domain/atom'
import {
  antdAtoms,
  codelabAtoms,
  htmlAtoms,
  muiAtoms,
} from '@codelab/frontend/domain/renderer'
import { useStore } from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useCallback, useMemo } from 'react'
import tw from 'twin.macro'

const AtomsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const htmlAtomsKeys = useMemo(() => Object.keys(htmlAtoms), [])
  const muiAtomsKeys = useMemo(() => Object.keys(muiAtoms), [])
  const antdAtomsKeys = useMemo(() => Object.keys(antdAtoms), [])
  const clAtomsKeys = useMemo(() => Object.keys(codelabAtoms), [])

  const getLibrary = useCallback(
    (atomType: string): AtomLibrary => {
      return htmlAtomsKeys.includes(atomType)
        ? { name: 'HTML', color: 'orange' }
        : antdAtomsKeys.includes(atomType)
        ? { name: 'Ant Design', color: 'geekblue' }
        : muiAtomsKeys.includes(atomType)
        ? { name: 'Material UI', color: 'purple' }
        : clAtomsKeys.includes(atomType)
        ? { name: 'Codelab', color: 'yellow' }
        : { name: 'Unknown', color: 'black' }
    },
    [htmlAtomsKeys, antdAtomsKeys, muiAtomsKeys, clAtomsKeys],
  )

  const fetchAtomsData = async (
    where: Maybe<AtomWhere>,
    options: Maybe<AtomOptions>,
  ) => {
    await Promise.all([
      store.atomService.getAll(where, options),
      store.tagService.getAll(),
    ])

    const atomsData: Array<AtomRecord> = store.atomService.atomsList.map(
      (atom) => ({
        id: atom.id,
        type: atom.type,
        apiId: atom.api.id,
        name: atom.name,
        tags: atom.tags.map((tag) => tag.current),
        library: getLibrary(atom.type),
        allowedChildren: atom.allowedChildren,
      }),
    )

    return atomsData
  }

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
      <ContentSection>
        <GetAtomsTable
          atomService={store.atomService}
          fetchAtomsData={fetchAtomsData}
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
  const { userService } = useStore()

  return (
    <DashboardTemplate
      Header={Header}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[
            appMenuItem,
            allPagesMenuItem(userService.user?.curAppId),
            pageBuilderMenuItem(
              userService.user?.curAppId,
              userService.user?.curPageId,
            ),
            resourceMenuItem,
          ]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
}
