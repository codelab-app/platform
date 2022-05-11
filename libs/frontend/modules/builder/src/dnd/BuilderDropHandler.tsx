import {
  BUILDER_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { BuilderDropId } from './BuilderDropId'
import { useCreateElementDroppable } from './useCreateElementDroppable'

// That's a separate component in order to not re-render the builder whenever
// the dnd position is changed, it causes massive lag
export const BuilderDropHandler = observer<
  WithServices<BUILDER_SERVICE | USER_SERVICE>
>(({ builderService, userService }) => {
  const { setNodeRef } = useCreateElementDroppable(BuilderDropId.BuilderRoot, {
    parentElementId: builderService.builderRenderer.tree?.root?.id as string,
    owner: userService.auth0Id,
  })

  return (
    <div
      css={css`
        ${tw`absolute inset-0`}
        z-index: -1;
      `}
      id="builder-drop-handler"
      ref={setNodeRef}
    />
  )
})
