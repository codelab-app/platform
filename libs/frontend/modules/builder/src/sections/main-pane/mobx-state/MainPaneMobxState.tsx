import { observer } from 'mobx-react-lite'
import React from 'react'
import { toAntd } from '../../../renderer/utils/platformState'
import { WithBuilderService } from '../../../store/BuilderService'
import { StateModal } from './StateModal'
import { StateTree } from './StateTree'

export const MainPaneMobxState = observer<WithBuilderService>(
  ({ builderService }) => {
    const { platformState } = builderService.builderRenderer
    const tree = toAntd(platformState, '')

    return (
      <>
        <StateModal builderService={builderService} />
        <StateTree builderService={builderService} parentPath="" state={tree} />
      </>
    )
  },
)
