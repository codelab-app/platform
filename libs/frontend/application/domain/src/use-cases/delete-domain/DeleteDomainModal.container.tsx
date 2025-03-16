'use client'

import { DomainConnector } from '../../views/Domain.connector'
import { DeleteDomainModal } from './DeleteDomainModal'

export const DeleteDomainModalContainer = ({ id }: { id: string }) => (
  <DomainConnector id={id}>
    {(domain) => <DeleteDomainModal domain={domain} />}
  </DomainConnector>
)

DeleteDomainModalContainer.displayName = 'DeleteDomainModalContainer'
