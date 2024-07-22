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
import { pageRef, redirectRef } from '@codelab/frontend/abstract/domain'
import {
  ExplorerPaneType,
  MODEL_ACTION,
  PageType,
} from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { IPageKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'
import { useDeletePageModal } from '../delete-page/delete-page-modal.state'
import { useRegeneratePages } from '../generate-pages'
import { useUpdatePageForm } from '../update-page/update-page-form.state'

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
    const { userDomainService } = useDomainStore()
    const { redirectService } = useStore()
    const { isRegenerating, regenerate } = useRegeneratePages()
    const deletePageModal = useDeletePageModal()
    const updatePageForm = useUpdatePageForm()
    const { popover } = useCui()
    const router = useRouter()
    const { query } = useUrl()

    const commonToolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: MODEL_ACTION.OpenBuilderBuilder.key,
        icon: <BuildOutlined />,
        onClick: () => {
          const url = queryString.stringifyUrl({
            query: {
              ...queryString.parse(query.toString()),
              pageSlug: page.slug,
              primarySidebarKey: ExplorerPaneType.Explorer,
              userSlug: userDomainService.user.username,
            },
            url: PageType.PageBuilder,
          })

          void router.push(url)
        },
        title: 'Open Builder',
      },
    ]

    const regularPageToolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: MODEL_ACTION.DeletePage.key,
        icon: <DeleteOutlined />,
        onClick: () => deletePageModal.open(pageRef(page)),
        title: 'Delete',
      },
      {
        cuiKey: page.redirect
          ? MODEL_ACTION.UpdateRedirect.key
          : MODEL_ACTION.CreateRedirect.key,
        icon: <SafetyOutlined />,
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
        cuiKey: MODEL_ACTION.BuildApp.key,
        icon: isRegenerating ? <LoadingOutlined /> : <ToolOutlined />,
        onClick: () => regenerate(app, [page.urlPattern]),
        title: 'Build',
      },
      {
        cuiKey: MODEL_ACTION.UpdatePage.key,
        icon: <EditOutlined />,
        onClick: () => {
          updatePageForm.open(pageRef(page))
          popover.open(MODEL_ACTION.UpdatePage.key)
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
