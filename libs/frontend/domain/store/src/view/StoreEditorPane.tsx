import type {
  IActionService,
  IFieldService,
  IStore,
} from '@codelab/frontend/abstract/core'
import { CreateFieldButton } from '@codelab/frontend/domain/type'
import {
  EditorPaneHeader,
  useResizable,
} from '@codelab/frontend/view/components'
import { Row } from 'antd'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React from 'react'
import tw from 'twin.macro'
import { CreateActionButton, GetActionsList, GetStateList } from '../use-cases'

export interface StoreEditorPaneProps {
  fieldService: IFieldService
  actionService: IActionService
  appStore?: IStore
}

const ResizableColumn = ({ children }: PropsWithChildren) => {
  const resizable = useResizable({
    width: { default: 240, max: 460, min: 240 },
  })

  return (
    <motion.div
      css={tw`h-full  flex flex-row w-4/12`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...resizable.containerProps}
    >
      <div css={tw`flex-1 overflow-y-auto`}>{children}</div>
      <motion.div
        css={[tw`bg-gray-200 h-full z-10`, `width: 2px`]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...resizable.xDragHandleProps}
      />
    </motion.div>
  )
}

export const StoreEditorPane = observer<StoreEditorPaneProps>(
  ({ fieldService, actionService, appStore }) => {
    const createStateFieldButton = (
      <CreateFieldButton
        fieldService={fieldService}
        interfaceId={appStore?.api.current.id}
      />
    )

    const createActionButton = (
      <CreateActionButton actionService={actionService} />
    )

    return (
      <Row css={tw`h-full`} wrap={false}>
        <ResizableColumn>
          <EditorPaneHeader extra={createStateFieldButton}>
            State
          </EditorPaneHeader>
          <GetStateList fieldService={fieldService} store={appStore} />
        </ResizableColumn>

        <motion.div css={tw`flex-1 h-full`}>
          <EditorPaneHeader extra={createActionButton}>
            Actions
          </EditorPaneHeader>
          <GetActionsList actionService={actionService} store={appStore} />
        </motion.div>
      </Row>
    )
  },
)
