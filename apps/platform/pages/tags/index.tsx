import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CreateTagModal,
  DeleteTagsModal,
  TagsPrimarySidebar,
  UpdateTagForm,
  UpdateTagModal,
} from '@codelab/frontend/application/tag'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiSkeletonWrapper,
} from '@codelab/frontend/presentation/codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const TagPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal />
      <UpdateTagModal />
      <DeleteTagsModal />

      <ContentSection>
        <UpdateTagForm />
      </ContentSection>
    </>
  )
})

const TagPageHeader = observer(() => {
  const { tagService } = useStore()
  const tag = tagService.updateForm.tag

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: 'Tags' }, { title: tag?.name || '' }]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
    />
  )
})

export default TagPage

TagPage.Layout = observer(({ children }) => {
  return (
    <DashboardTemplate
      Header={TagPageHeader}
      PrimarySidebar={{
        default: ExplorerPaneType.Tag,
        items: [{ key: ExplorerPaneType.Tag, render: TagsPrimarySidebar }],
      }}
    >
      {children()}
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRedirect()
