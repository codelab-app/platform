import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { BuilderDropId } from './BuilderDropId'
import { useCreateElementDroppable } from './useCreateElementDroppable'

type BuilderDropHandlerProps = {
  elementId: string
}

// That's a separate component in order to not re-render the builder whenever
// the dnd position is changed, it causes massive lag
export const BuilderDropHandler = observer<BuilderDropHandlerProps>(
  ({ elementId }) => {
    // const elementId = builderService.builderRenderer.tree?.root?.id

    const { setNodeRef } = useCreateElementDroppable(
      BuilderDropId.BuilderRoot,
      {
        parentElementId: elementId,
      },
    )

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
  },
)

BuilderDropHandler.displayName = 'BuilderDropHandler'
