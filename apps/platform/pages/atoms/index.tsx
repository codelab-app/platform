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
import { useStore } from '@codelab/frontend/presentation/container'
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
  const { atomService, fieldService } = useStore()
  const atomToUpdate = atomService.updateForm.atom?.name || ''
  const fieldToUpdate = fieldService.updateForm.field?.key || ''

  const atomOrField = atomService.updateForm.isOpen
    ? 'atom'
    : fieldService.updateForm.isOpen
    ? 'field'
    : ''

  const atomOrFieldName = atomService.updateForm.isOpen
    ? atomToUpdate
    : fieldToUpdate

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[
            { title: 'Atoms' },
            { title: atomOrField },
            { title: atomOrFieldName },
          ]}
        />
      }
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
