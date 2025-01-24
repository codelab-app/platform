'use client'

import type {
  SubmitController,
  URLSeachParamPageProps,
} from '@codelab/frontend/abstract/types'
import type { IAtomDto, ITagDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons/lib/icons'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { UpdateAtomPopover } from '@codelab/frontend-application-atom/use-cases/update-atom'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

interface UpdateAtomContainerProps {
  atomsDto: Array<IAtomDto>
  id: string
  searchParams: URLSeachParamPageProps
  tagsDto: Array<ITagDto>
}

/**
 * Move sidebar secondary and hydrator below it, so we can render the UI first
 */
const UpdateAtomConnector = observer<UpdateAtomContainerProps>(
  ({ atomsDto, id, searchParams, tagsDto }) => {
    const submitRef = useRef<Maybe<SubmitController>>()
    const { updatePopover } = useAtomService()
    const router = useRouter()
    const { atomDomainService } = useDomainStore()
    const atom = atomDomainService.atoms.get(id)

    return (
      <CuiSidebarSecondary
        id={UiKey.AtomPopoverUpdate}
        toolbar={{
          items: [
            {
              cuiKey: UiKey.AtomToolbarItemCreate,
              icon: <SaveOutlined />,
              label: 'Update',
              onClick: () => {
                submitRef.current?.submit()
              },
              title: 'Update',
            },
            {
              cuiKey: UiKey.AtomToolbarItemCreateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => {
                updatePopover.close(router)
              },
              title: 'Cancel',
            },
          ],
          title: 'Update Atom toolbar',
        }}
      >
        <ApplicationStoreHydrator
          fallback={<Spinner />}
          queryParams={searchParams}
        >
          <DomainStoreHydrator
            atomsDto={atomsDto}
            fallback={<Spinner />}
            tagsDto={tagsDto}
          >
            {atom && <UpdateAtomPopover atom={atom} submitRef={submitRef} />}
          </DomainStoreHydrator>
        </ApplicationStoreHydrator>
      </CuiSidebarSecondary>
    )
  },
)

UpdateAtomConnector.displayName = 'UpdateAtomContainer'

export default UpdateAtomConnector
