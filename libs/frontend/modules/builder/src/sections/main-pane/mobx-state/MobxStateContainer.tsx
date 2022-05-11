import { BUILDER_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { toAntd } from '../../../renderer/utils/platformState'
import { MobxStateModal } from './MobxStateModal'
import { MobxStateTree } from './MobxStateTree'

export const MobxStateContainer = observer<WithServices<BUILDER_SERVICE>>(
  ({ builderService }) => {
    const { platformState } = builderService.builderRenderer
    const tree = toAntd(platformState, '')

    return (
      <>
        <MobxStateModal
          close={builderService.stateModal.close}
          isOpen={builderService.stateModal.isOpen}
          node={builderService.stateModal.node}
        />
        <MobxStateTree
          builderService={builderService}
          parentPath=""
          state={tree}
        />
      </>
    )
  },
)
