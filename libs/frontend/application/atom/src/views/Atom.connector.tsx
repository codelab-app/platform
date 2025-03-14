import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const AtomConnector = observer(
  ({ children, id }: { id: string; children(atom: IAtomModel): ReactNode }) => {
    const { atomDomainService } = useDomainStore()
    const atom = atomDomainService.atoms.get(id)

    if (!atom) {
      return <Spinner />
    }

    return <>{children(atom)}</>
  },
)
