import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import { NewRoutePaths } from '@codelab/frontend/abstract/application'
import { type IDomainModel } from '@codelab/frontend/abstract/domain'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'

import { RefreshDomainButton } from './RefreshDomainButton'

export interface ItemToolsProps {
  domain: IDomainModel
}

export const ItemTools = observer<ItemToolsProps>(
  ({ domain }: ItemToolsProps) => {
    const router = useRouter()

    const onDeleteClick = () =>
      router.push(
        NewRoutePaths.Domain.delete({
          appId: domain.app.id,
          domainId: domain.id,
        }),
      )

    return (
      <Fragment>
        <RefreshDomainButton domain={domain} />
        <Link
          href={NewRoutePaths.Domain.update({
            appId: domain.app.id,
            domainId: domain.id,
          })}
        >
          <Button icon={<EditOutlined />} shape="circle" type="text" />
        </Link>
        <Button
          icon={<DeleteOutlined />}
          onClick={onDeleteClick}
          shape="circle"
          type="text"
        />
      </Fragment>
    )
  },
)
