'use client'

import { DomainConnector } from '../../views'
import { UpdateDomainModal } from './UpdateDomainModal'

export const UpdateDomainModalContainer = ({ id }: { id: string }) => (
  <DomainConnector id={id}>
    {(domain) => <UpdateDomainModal domain={domain} />}
  </DomainConnector>
)

UpdateDomainModalContainer.displayName = 'UpdateDomainModalContainer'
