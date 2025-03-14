'use client'

import { UpdateDomainModal } from '@codelab/frontend-application-domain/use-cases/update-domain'
import { DomainConnector } from '@codelab/frontend-application-domain/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DomainUpdateContainer = observer(({ id }: { id: string }) => (
  <DomainConnector id={id}>
    {(domain) => <UpdateDomainModal domain={domain} />}
  </DomainConnector>
))
