import { auth0Instance } from '@codelab/backend/adapter/auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  AtomLibrary,
  AtomRecord,
  CreateAtomButton,
  CreateAtomModal,
  DeleteAtomsModal,
  GetAtomsTable,
  UpdateAtomModal,
} from '@codelab/frontend/modules/atom'
import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  ContentSection,
  pageBuilderMenuItem,
  resourceMenuItem,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React, { useCallback, useEffect, useMemo } from 'react'
import tw from 'twin.macro'
import {
  antdAtoms,
  codelabAtoms,
  htmlAtoms,
  muiAtoms,
} from '../../../../libs/frontend/modules/renderer/src/atoms'

const AtomsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const htmlAtomsKeys = useMemo(() => Object.keys(htmlAtoms), [htmlAtoms])
  const muiAtomsKeys = useMemo(() => Object.keys(muiAtoms), [muiAtoms])
  const antdAtomsKeys = useMemo(() => Object.keys(antdAtoms), [antdAtoms])
  const clAtomsKeys = useMemo(() => Object.keys(codelabAtoms), [codelabAtoms])

  const getLibrary = useCallback((atomType: string): AtomLibrary => {
    return htmlAtomsKeys.includes(atomType)
      ? { name: 'HTML', color: 'orange' }
      : antdAtomsKeys.includes(atomType)
      ? { name: 'Ant Design', color: 'geekblue' }
      : muiAtomsKeys.includes(atomType)
      ? { name: 'Material UI', color: 'purple' }
      : clAtomsKeys.includes(atomType)
      ? { name: 'Codelab', color: 'yellow' }
      : { name: 'Unknown', color: 'black' }
  }, [])

  const [getAtoms, { isLoading }] = useStatefulExecutor(() =>
    store.atomService.getAll(),
  )

  useEffect(() => {
    getAtoms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const atomsData: Array<AtomRecord> = store.atomService.atoms.map((a) => ({
    id: a.id,
    type: a.type,
    apiId: a.api.id,
    name: a.name,
    tags: a.tags.map((tag) => tag.current),
    library: getLibrary(a.type),
  }))

  useStatefulExecutor(() => store.tagService.getAll(), {
    executeOnMount: true,
  })

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
          atomsData={atomsData}
          isLoading={isLoading}
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

export const getServerSideProps = auth0Instance.withPageAuthRequired({
  getServerSideProps: async ({ req, res }: GetServerSidePropsContext) => {
    // const store = initializeStore({ user })

    return {
      // props: { snapshot: getSnapshot(store) },
      props: {},
    }
  },
})

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
            storeMenuItem(userService.user?.curAppId),
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
