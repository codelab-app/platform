import { IBuilderService, IRenderService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { toAntd } from '../../../renderer/utils/platformState'
import { MobxStateModal } from './MobxStateModal'
import { MobxStateTree } from './MobxStateTree'

type MobxStateContainerProps = {
  renderService: IRenderService
  builderService: IBuilderService
}

export const MobxStateContainer = observer<MobxStateContainerProps>(
  ({ builderService, renderService }) => {
    const { platformState } = renderService
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
