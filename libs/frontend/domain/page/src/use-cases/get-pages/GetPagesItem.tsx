import { FileOutlined } from '@ant-design/icons'
import type { IDomain, IPage } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { regeneratePages } from '@codelab/frontend/domain/domain'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  ListItemBuildButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/presentation/view'
import { IPageKind } from '@codelab/shared/abstract/core'
import { List, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { pageRef } from '../../store'

export interface GetPagesItemProps {
  domains?: Array<IDomain>
  page: IPage
}

export const GetPagesItem = observer<GetPagesItemProps>(({ domains, page }) => {
  const { pageService } = useStore()
  const router = useRouter()

  const href = {
    pathname: PageType.PageBuilder,
    query: { ...router.query, pageId: page.id },
  }

  const [rebuildButtonLoading, setRebuildButtonLoading] = useState(false)

  const onClickBuild = async () => {
    const pageDomain = domains?.find((domain) => domain.app.id === page.app.id)

    if (pageDomain?.name) {
      setRebuildButtonLoading(true)
      await regeneratePages([page.url], pageDomain.name)
      setRebuildButtonLoading(false)
    }
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
})
