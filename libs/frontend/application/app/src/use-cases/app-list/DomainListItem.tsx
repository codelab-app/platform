import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined'
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined'
import LinkOutlined from '@ant-design/icons/LinkOutlined'
import {
  type FragmentType,
  graphql,
  useFragment,
} from '@codelab/frontend/infra/gql'
import Link from 'next/link'
import React from 'react'

const DomainListItem_domainFragment = graphql(`
  fragment DomainListItem_domainFragment on Domain {
    id
    name
    domainConfig {
      misconfigured
    }
  }
`)

export interface DomainListItem {
  domain: FragmentType<typeof DomainListItem_domainFragment>
}

export const DomainListItem = (props: DomainListItem) => {
  const domain = useFragment(DomainListItem_domainFragment, props.domain)
  const { domainConfig, name } = domain
  const valid = !domainConfig.misconfigured

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
