import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import type { IDomain } from '@codelab/frontend/abstract/core'
import Link from 'next/link'
import React from 'react'

export interface DomainListProps {
  domains: Array<IDomain>
}

export const DomainsList = ({ domains }: DomainListProps) => {
  if (!domains.length) {
    return <div className="text-red-400">No domains assigned</div>
  }

  return (
    <>
      {domains.map((domain) => {
        const { domainConfig, name, projectDomain } = domain
        const valid = projectDomain?.verified && !domainConfig?.misconfigured

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
      })}
    </>
  )
}
