import { FileOutlined } from '@ant-design/icons'
import type {
  IDomain,
  IPage,
  IPageService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { regeneratePages } from '@codelab/frontend/domain/domain'
import {
  ListItemBuildButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IPageKind } from '@codelab/shared/abstract/core'
import { List, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { pageRef } from '../../store'

export interface GetPagesItemProps {
  page: IPage
  pageService: IPageService
  domains?: Array<IDomain>
}

export const GetPagesItem = observer<GetPagesItemProps>(
  ({ page, pageService, domains }) => {
    const router = useRouter()

    const href = {
      pathname: PageType.PageBuilder,
      query: { ...router.query, pageId: page.id },
    }

    const [rebuildButtonLoading, setRebuildButtonLoading] = useState(false)

    const onClickBuild = async () => {
      setRebuildButtonLoading(true)
      await regeneratePages(page.id)
      setRebuildButtonLoading(false)
    }

    const onClickDelete = () => pageService.deleteModal.open(pageRef(page.id))
    const onClickEdit = () => pageService.updateModal.open(pageRef(page.id))

    return (
      <List.Item style={{ paddingLeft: 0 }}>
        <Space style={{ width: '100%' }}>
          <FileOutlined />
          <Link href={href}>{page.name}</Link>
        </Space>
        {page.kind === IPageKind.Regular && (
          <Space>
            <ListItemBuildButton
              disabled={!domains}
              loading={rebuildButtonLoading}
              onClick={onClickBuild}
            />
            <ListItemEditButton onClick={onClickEdit} />
            <ListItemDeleteButton onClick={onClickDelete} />
          </Space>
        )}
      </List.Item>
    )
  },
)
