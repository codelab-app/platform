import type { IAppModel } from '@codelab/frontend/abstract/domain'
import React from 'react'
import { DomainListItem } from './DomainListItem'

export const DomainList = ({ app }: { app: IAppModel }) => {
  const { domains } = app

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
