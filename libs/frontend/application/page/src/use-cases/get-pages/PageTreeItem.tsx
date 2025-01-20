'use client'

import type {
  IAppModel,
  IPageNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'

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
  PageType,
  PrimarySidebar,
  UiKey,
} from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useRedirectService } from '@codelab/frontend-application-redirect/services'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { usePageService } from '../../services/page.service'
import { useRegeneratePages } from '../generate-pages'

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
    const { isRegenerating, regenerate } = useRegeneratePages()
    const router = useRouter()
    const { removeMany, updatePopover } = usePageService()
    const redirectService = useRedirectService()
    const { appId } = useUrlPathParams()

    const commonToolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: UiKey.BuilderToolbarItemOpenBuilder,
        icon: <BuildOutlined />,
        onClick: () => {
          const url = PageType.PageBuilder(
            {
              appId,
              pageId: page.id,
            },
            PrimarySidebar.ElementTree,
          )

          void router.push(url)
        },
        title: 'Open Builder',
      },
    ]

    const regularPageToolbarItems: Array<ToolbarItem> = [
      {
        confirmText: `Are you sure you want to delete "${page.name}"?`,
        cuiKey: UiKey.PageToolbarItemDelete,
        icon: <DeleteOutlined />,
        onClick: () => removeMany([page]),
        title: 'Delete',
      },
      {
        cuiKey: page.redirect
          ? UiKey.RedirectToolbarItemUpdate
          : UiKey.RedirectToolbarItemCreate,
        icon: <SafetyOutlined />,
        onClick: () => {
          if (page.redirect) {
            redirectService.updatePopover.open(router, {
              appId,
              pageId: page.id,
              redirectId: page.redirect.id,
            })
          } else {
            redirectService.createPopover.open(router, {
              appId,
              pageId: page.id,
            })
          }
        },
        title: 'Auth Guard',
      },
      {
        cuiKey: UiKey.AppToolbarItemBuild,
        icon: isRegenerating ? <LoadingOutlined /> : <ToolOutlined />,
        onClick: () => regenerate(app, [page.urlPattern]),
        title: 'Build',
      },
      {
        cuiKey: UiKey.PageToolbarItemUpdate,
        icon: <EditOutlined />,
        onClick: () => updatePopover.open(router, { appId, pageId: page.id }),
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
            <FileTextOutlined style={{ color: 'blue' }} />
          ) : (
            <FileOutlined style={{ color: 'black' }} />
          )
        }
        primaryTitle={primaryTitle}
        tag={
          page.redirect?.id && (
            <LockFilled
              style={{ color: 'green' }}
              title="Auth Redirect applied"
            />
          )
        }
        toolbar={
          <CuiTreeItemToolbar items={toolbarItems} title="page toolbar" />
        }
      />
    )
  },
)
