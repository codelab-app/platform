'use client'

import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { IAtomDto, ITagDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons/lib/icons'
import { UiKey } from '@codelab/frontend/abstract/types'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { UpdateAtomPopover } from '@codelab/frontend-application-atom/use-cases/update-atom'
import { AtomConnector } from '@codelab/frontend-application-atom/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

/**
 * Move sidebar secondary and hydrator below it, so we can render the UI first
 */
export const UpdateAtomContainer = observer<{ id: string }>(({ id }) => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)

  return (
    <AtomConnector id={id}>
      {(atom) => <UpdateAtomPopover atom={atom} submitRef={submitRef} />}
    </AtomConnector>
  )
})
