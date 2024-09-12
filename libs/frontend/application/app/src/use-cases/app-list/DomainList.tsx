import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { DomainListItem } from './DomainListItem'

export interface DomainListProps {
  app: IAppModel
}

export const DomainList = ({ app }: DomainListProps) => {
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
