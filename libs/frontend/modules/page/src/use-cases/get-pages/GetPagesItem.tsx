import { FileOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/state/router'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { List, Space } from 'antd'
import Link from 'next/link'
import { usePageDispatch } from '../../hooks'
import { GetPagesItemProps } from './types'

export const GetPagesItem = ({ page, appId }: GetPagesItemProps) => {
  const { openDeleteModal, openUpdateModal } = usePageDispatch()

  const href = {
    pathname: PageType.PageBuilder,
    query: { appId, pageId: page.id },
  }

  const onClickDelete = () =>
    openDeleteModal({
      deleteIds: [page.id],
      entity: page,
    })

  const onClickEdit = () =>
    openUpdateModal({
      updateId: page.id,
      entity: page,
    })

  return (
    <List.Item style={{ paddingLeft: 0 }}>
      <Space style={{ width: '100%' }}>
        <FileOutlined />
        <Link href={href}>
          <a>{page.name}</a>
        </Link>
      </Space>
      <Space>
        <ListItemEditButton onClick={onClickEdit} />
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    </List.Item>
  )
}
