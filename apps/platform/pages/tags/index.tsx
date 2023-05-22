import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  CreateTagModal,
  DeleteTagsModal,
  GetTagsTable,
  GetTagsTree,
  tagRef,
  UpdateTagModal,
} from '@codelab/frontend/domain/tag'
import {
  Header,
  HeaderBreadcrumb,
  HeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

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
        <GetTagsTable loading={status === 'loading'} />
      </ContentSection>
    </>
  )
})

const TagPageHeader = observer(() => {
  const { tagService } = useStore()
  const ids = tagService.checkedTags.map((tag) => tag.id)

  const toolbarItems = [
    {
      icon: <PlusOutlined />,
      key: 'create',
      onClick: () => tagService.createModal.open(),
      title: 'Create Tag',
    },
    {
      icon: <DeleteOutlined />,
      key: 'delete',
      onClick: () =>
        tagService.deleteManyModal.open(ids.map((id) => tagRef(id))),
      title: 'Delete Tag',
    },
  ]

  return (
    <Header
      direction={<HeaderBreadcrumb items={[{ title: 'Tags' }]} />}
      logo={
        <Image
          alt="codelab logo"
          css={tw`w-full h-full`}
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={
        <HeaderToolbar items={toolbarItems} title="Tags Header Toolbal" />
      }
    />
  )
})

export default TagPage

TagPage.Layout = observer(({ children }) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      ExplorerPane={{
        default: ExplorerPaneType.Tag,
        items: [{ key: ExplorerPaneType.Tag, render: () => <GetTagsTree /> }],
      }}
      Header={TagPageHeader}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {children()}
    </DashboardTemplate>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired()
