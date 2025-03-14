'use client'

import { DeleteDomainModal } from '@codelab/frontend-application-domain/use-cases/delete-domain'
import { DomainConnector } from '@codelab/frontend-application-domain/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DomainDeleteContainer = observer(({ id }: { id: string }) => (
  <DomainConnector id={id}>
    {(domain) => <DeleteDomainModal domain={domain} />}
  </DomainConnector>
))
