import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Layout } from 'antd'
import React, { PropsWithChildren, useContext } from 'react'
import { contentStyle } from '@codelab/frontend/style'
import { AppContext, AppProvider } from '@codelab/frontend/shared'
import { PaneMain } from './pane-main'
import { PaneConfig } from './pane-config'

const { Sider, Content } = Layout

const tabsWidth = 40
const paneConfigWidth = 320
const defaultPaneMainWidth = 480

export const Builder = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const { appId, pageId } = useContext(AppContext)

  // Listen for when we're dragging over a component and hide the sidebar if we do. But don't actually
  // stop rendering the components, since the logic in them needs to run. Just visually hide them
  // This probably isn't the best place for it, but I didn't want to mess with the layout state
  // because we might refactor it to use recoil? If not - we can add a "Hidden" state, where we just hide the pane visually

  // const [{ isOver, isDragging, delta }, dropRef] = useDrop({
  //   accept: DragAndDropTypes.Component,
  //   collect: (m) => ({
  //     delta: m.getDifferenceFromInitialOffset(),
  //     isOver: m.isOver(),
  //     isDragging: !!m.getItemType(),
  //   }),
  // })

  const { reset: resetSelection } = useBuilderSelectionState()

  return (
    <AppProvider appId={appId} pageId={pageId}>
      <Layout style={{ height: '100%' }}>
        <div>
          <Sider
            theme="light"
            style={{ height: '100%' }}
            width={defaultPaneMainWidth}
          >
            <PaneMain />
          </Sider>
        </div>
        <Layout>
          <Content
            onClick={() => {
              resetSelection()
            }}
            style={{
              ...contentStyle,
              paddingLeft: tabsWidth,
              paddingRight: paneConfigWidth,
            }}
          >
            {children}
          </Content>
        </Layout>
        <Sider
          theme="light"
          width={paneConfigWidth}
          style={{
            overflowY: 'scroll',
            position: 'fixed',
            height: '100%',
            top: 0,
            right: 0,
          }}
        >
          <PaneConfig />
        </Sider>
      </Layout>
    </AppProvider>
  )
}
