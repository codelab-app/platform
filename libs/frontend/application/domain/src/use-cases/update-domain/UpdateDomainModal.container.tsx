'use client'

import { DomainConnector } from '@codelab/frontend/infra/connector'

import { UpdateDomainModal } from './UpdateDomainModal'

export const UpdateDomainModalContainer = ({ id }: { id: string }) => (
  <DomainConnector id={id}>
    {(domain) => <UpdateDomainModal domain={domain} />}
  </DomainConnector>
)

UpdateDomainModalContainer.displayName = 'UpdateDomainModalContainer'
