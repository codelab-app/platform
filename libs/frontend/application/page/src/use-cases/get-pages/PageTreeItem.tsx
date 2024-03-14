import BuildOutlined from '@ant-design/icons/BuildOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import FileOutlined from '@ant-design/icons/FileOutlined'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import LockFilled from '@ant-design/icons/lib/icons/LockFilled'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import SafetyOutlined from '@ant-design/icons/SafetyOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import {
  type IAppModel,
  type IPagesTreeDataNode,
  pageRef,
  redirectRef,
} from '@codelab/frontend/abstract/domain'
import {
  ExplorerPaneType,
  MODEL_ACTION,
  PageType,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { regeneratePages } from '@codelab/frontend/domain/domain'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface PageTreeItemProps {
  app: IAppModel
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
    const { domainService, pageService, redirectService, userService } =
      useStore()

    const { popover } = useCui()
    const [rebuildButtonLoading, setRebuildButtonLoading] = useState(false)
    const router = useRouter()
    const domains = app.domains.map((domain) => domain)

    const commonToolbarItems = [
      {
        icon: <BuildOutlined />,
        key: MODEL_ACTION.OpenBuilder.key,
        onClick: () => {
          void router.push({
            pathname: PageType.PageBuilder,
            query: {
              ...router.query,
              pageSlug: page.slug,
              primarySidebarKey: ExplorerPaneType.Explorer,
              userSlug: userService.user.username,
            },
          })
        },
        title: 'Open Builder',
      },
    ]

    const regularPageToolbarItems = [
      {
        icon: <DeleteOutlined />,
        key: MODEL_ACTION.DeleteRedirect.key,
        onClick: () => pageService.deleteModal.open(pageRef(page)),
        title: 'Delete',
      },
      {
        icon: <SafetyOutlined />,
        key: MODEL_ACTION.UpdateRedirect.key,
        onClick: () => {
          if (page.redirect) {
            redirectService.updateForm.open(redirectRef(page.redirect.id))
            popover.open(MODEL_ACTION.UpdateRedirect.key)
          } else {
            redirectService.createForm.open(pageRef(page))
            popover.open(MODEL_ACTION.CreateRedirect.key)
          }
        },
        title: 'Auth Guard',
      },
      {
        icon: rebuildButtonLoading ? <LoadingOutlined /> : <ToolOutlined />,
        key: MODEL_ACTION.BuildApp.key,
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
        key: MODEL_ACTION.UpdatePage.key,
        onClick: () => {
          pageService.updateForm.open(pageRef(page))
          popover.open(MODEL_ACTION.UpdatePage.key)
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
            <>
              {page.redirect?.id && <LockFilled style={{ color: 'green' }} />}
              <FileTextOutlined style={{ color: 'blue' }} />
            </>
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
