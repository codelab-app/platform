import type { IDomainDto } from '@codelab/shared-abstract-core'

import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined'
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined'
import LinkOutlined from '@ant-design/icons/LinkOutlined'
import Link from 'next/link'

export interface DomainListItemProps {
  domain: IDomainDto
}

export const DomainListItem = ({ domain }: DomainListItemProps) => {
  const { domainConfig, name } = domain
  const valid = !domainConfig?.misconfigured

  const badge = valid ? (
    <span className="flex items-center text-green-400">
      <CheckCircleOutlined className="mr-1" /> Valid
    </span>
  ) : (
    <span className="flex items-center text-red-400">
      <CloseCircleOutlined className="mr-1" /> Invalid
    </span>
  )

  return (
    <div className="flex items-center justify-between text-sm" key={name}>
      <Link href={`https://${name}`}>
        <span>
          {name} <LinkOutlined />
        </span>
      </Link>

      {badge}
    </div>
  )
}
