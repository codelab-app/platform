import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  CreateTagModal,
  DeleteTagsModal,
  TagsPrimarySidebar,
  UpdateTagForm,
  UpdateTagModal,
} from '@codelab/frontend/domain/tag'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiSkeletonWrapper,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { withPageAuthRedirect } from '@codelab/frontend/shared/utils'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const TagPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { tagService } = useStore()

  const [{ status }, loadTagTree] = useAsync(() => {
    tagService.loadTagTree()

    return Promise.resolve()
  })

  useMountEffect(loadTagTree.execute)

  return (
    <>
      <Head>
        <title>Tags | Codelab</title>
      </Head>

      <CreateTagModal />
      <UpdateTagModal />
      <DeleteTagsModal />

      <ContentSection>
        <CuiSkeletonWrapper isLoading={status === 'loading'}>
          <UpdateTagForm />
        </CuiSkeletonWrapper>
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
          className="h-full w-full"
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
