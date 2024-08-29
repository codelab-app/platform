'use client'

import BuildOutlined from '@ant-design/icons/BuildOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import FileOutlined from '@ant-design/icons/FileOutlined'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import LockFilled from '@ant-design/icons/lib/icons/LockFilled'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import SafetyOutlined from '@ant-design/icons/SafetyOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import type {
  IAppModel,
  IPageNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { pageRef } from '@codelab/frontend/abstract/domain'
import {
  ExplorerPaneType,
  PageType,
  UiKey,
} from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { useCreateRedirectForm } from '@codelab/frontend-application-redirect/use-cases/create-redirect'
import { useUpdateRedirectForm } from '@codelab/frontend-application-redirect/use-cases/update-redirect'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useUser } from '@codelab/frontend-application-user/services'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'
import { useDeletePageModal } from '../delete-page/delete-page.state'
import { useRegeneratePages } from '../generate-pages'
import { useUpdatePageForm } from '../update-page/update-page.state'

interface PageTreeItemProps {
  app: IAppModel
  data: ITreeNode<IPageNodeData>
}

export const PageTreeItem = observer(
  ({
    app,
    data: {
      extraData: { node: page },
      primaryTitle,
    },
  }: PageTreeItemProps) => {
    const updateRedirectForm = useUpdateRedirectForm()
    const createRedirectForm = useCreateRedirectForm()
    const user = useUser()
    const { isRegenerating, regenerate } = useRegeneratePages()
    const deletePageModal = useDeletePageModal()
    const updatePageForm = useUpdatePageForm()
    const { popover } = useCui()
    const router = useRouter()
    const { query } = useUrl()

    const commonToolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: UiKey.OpenBuilderBuilderToolbarItem,
        icon: <BuildOutlined />,
        onClick: () => {
          const url = queryString.stringifyUrl({
            query: {
              ...queryString.parse(query.toString()),
              pageSlug: page.slug,
              primarySidebarKey: ExplorerPaneType.Explorer,
              userSlug: user.username,
            },
            url: PageType.PageBuilder(),
          })

          void router.push(url)
        },
        title: 'Open Builder',
      },
    ]

    const regularPageToolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: UiKey.DeletePageToolbarItem,
        icon: <DeleteOutlined />,
        onClick: () => deletePageModal.open(pageRef(page)),
        title: 'Delete',
      },
      {
        cuiKey: page.redirect
          ? UiKey.UpdateRedirectToolbarItem
          : UiKey.CreateRedirectToolbarItem,
        icon: <SafetyOutlined />,
        onClick: () => {
          if (page.redirect) {
            updateRedirectForm.open(page.redirect.current)
            popover.open(UiKey.UpdateRedirectPopover)
          } else {
            createRedirectForm.open(page)
            popover.open(UiKey.CreateRedirectPopover)
          }
        },
        title: 'Auth Guard',
      },
      {
        cuiKey: UiKey.BuildAppToolbarItem,
        icon: isRegenerating ? <LoadingOutlined /> : <ToolOutlined />,
        onClick: () => regenerate(app, [page.urlPattern]),
        title: 'Build',
      },
      {
        cuiKey: UiKey.UpdatePageToolbarItem,
        icon: <EditOutlined />,
        onClick: () => {
          updatePageForm.open(pageRef(page))
          popover.open(UiKey.UpdatePagePopover)
        },
        title: 'Edit',
      },
    ]

    const toolbarItems: Array<ToolbarItem> =
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
