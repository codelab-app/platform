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
import { pageRef } from '@codelab/frontend/abstract/domain'
import {
  PageType,
  PrimarySidebar,
  UiKey,
} from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { useCreateRedirectForm } from '@codelab/frontend-application-redirect/use-cases/create-redirect'
import { useUpdateRedirectForm } from '@codelab/frontend-application-redirect/use-cases/update-redirect'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

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
    const { isRegenerating, regenerate } = useRegeneratePages()
    const deletePageModal = useDeletePageModal()
    const updatePageForm = useUpdatePageForm()
    const { popover } = useCui()
    const router = useRouter()
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
        cuiKey: UiKey.PageToolbarItemDelete,
        icon: <DeleteOutlined />,
        onClick: () => deletePageModal.open(pageRef(page)),
        title: 'Delete',
      },
      {
        cuiKey: page.redirect
          ? UiKey.RedirectToolbarItemUpdate
          : UiKey.RedirectToolbarItemCreate,
        icon: <SafetyOutlined />,
        onClick: () => {
          if (page.redirect) {
            updateRedirectForm.open(page.redirect.current)
            popover.open(UiKey.RedirectPopoverUpdate)
          } else {
            createRedirectForm.open(page)
            popover.open(UiKey.RedirectPopoverCreate)
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
        onClick: () => {
          updatePageForm.open(pageRef(page))
          popover.open(UiKey.PagePopoverUpdate)
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
