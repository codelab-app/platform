import { FileOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/store/router'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { List, Space } from 'antd'
import Link from 'next/link'
import { PageBaseFragment } from '../../graphql/PageBase.fragment.graphql.gen'
import { usePageDispatch } from '../../hooks'

export type GetPagesItemProps = {
  page: PageBaseFragment
  appId: string
}

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
