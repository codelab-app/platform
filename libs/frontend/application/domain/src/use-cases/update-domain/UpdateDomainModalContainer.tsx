'use client'

import { observer } from 'mobx-react-lite'

import { DomainConnector } from '../../views/Domain.connector'
import { UpdateDomainModal } from './UpdateDomainModal'

export const UpdateDomainModalContainer = ({ id }: { id: string }) => (
  <DomainConnector id={id}>
    {(domain) => <UpdateDomainModal domain={domain} />}
  </DomainConnector>
)

UpdateDomainModalContainer.displayName = 'UpdateDomainModalContainer'
