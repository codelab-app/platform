import {
  BuildOutlined,
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  FileTextOutlined,
  LoadingOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import type { IApp, IPagesTreeDataNode } from '@codelab/frontend/abstract/core'
import { pageRef } from '@codelab/frontend/abstract/core'
import {
  ExplorerPaneType,
  FormNames,
  PageType,
} from '@codelab/frontend/abstract/types'
import { regeneratePages } from '@codelab/frontend/domain/domain'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface PageTreeItemProps {
  app: IApp
  data: IPagesTreeDataNode
}

export const PageTreeItem = observer(
  ({
    app,
    data: {
      extraData: { node: page },
      primaryTitle,
    },
  }: PageTreeItemProps) => {
    const { domainService, pageService, userService } = useStore()
    const { popover } = useCui()
    const [rebuildButtonLoading, setRebuildButtonLoading] = useState(false)
    const router = useRouter()
    const domains = app.domains.map((domain) => domain.current)

    const commonToolbarItems = [
      {
        icon: <BuildOutlined />,
        key: 'open_builder',
        onClick: () => {
          void router.push({
            pathname: PageType.PageBuilder,
            query: {
              ...router.query,
              pageSlug: page.slug,
              primarySidebarKey: ExplorerPaneType.Explorer,
              userName: userService.user.username,
            },
          })
        },
        title: 'Open Builder',
      },
    ]

    const regularPageToolbarItems = [
      {
        icon: <DeleteOutlined />,
        key: 'delete',
        onClick: () => pageService.deleteModal.open(pageRef(page)),
        title: 'Delete',
      },
      {
        icon: rebuildButtonLoading ? <LoadingOutlined /> : <ToolOutlined />,
        key: 'build',
        onClick: async () => {
          let pageDomains = domains.filter(
            (domain) => domain.app.id === page.app.id,
          )

          if (!pageDomains.length) {
            pageDomains = await domainService.getAll({
              app: { id: page.app.id },
            })
          }

          setRebuildButtonLoading(true)

          for (const pageDomain of pageDomains) {
            await regeneratePages([page.url], pageDomain.name)
          }

          setRebuildButtonLoading(false)
        },
        title: 'Build',
      },
      {
        icon: <EditOutlined />,
        key: 'edit',
        onClick: () => {
          pageService.updateForm.open(pageRef(page))
          popover.open(FormNames.UpdatePage)
        },
        title: 'Edit',
      },
    ]

    const toolbarItems =
      page.kind === IPageKind.Regular
        ? [...regularPageToolbarItems, ...commonToolbarItems]
        : [...commonToolbarItems]

    return (
      <CuiTreeItem
        icon={
          page.kind === IPageKind.Regular ? (
            <FileTextOutlined style={{ color: 'blue' }} />
          ) : (
            <FileOutlined style={{ color: 'black' }} />
          )
        }
        primaryTitle={primaryTitle}
        toolbar={
          <CuiTreeItemToolbar items={toolbarItems} title="page toolbar" />
        }
      />
    )
  },
)
