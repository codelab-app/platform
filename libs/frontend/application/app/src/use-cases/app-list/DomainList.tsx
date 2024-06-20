import { type FragmentType, useFragment } from '@codelab/frontend/infra/gql'
import React from 'react'
import type { DomainList_AppFragment } from './DomainList_domains.fragment'
import { DomainList_appFragment } from './DomainList_domains.fragment'
import { DomainListItem } from './DomainListItem'

export interface DomainListProps {
  app: DomainList_AppFragment
}

export const DomainList = (props: DomainListProps) => {
  const { domains } = useFragment(DomainList_appFragment, props.app)

  if (!domains.length) {
    return <div className="text-red-400">No domains assigned</div>
  }

  return (
    <>
      {domains.map((domain) => (
        <DomainListItem domain={domain} key={domain.id} />
      ))}
    </>
  )
}
