import { css } from '@emotion/react'
import useSize from '@react-hook/size'
import { useWindowHeight } from '@react-hook/window-size'
import { Layout } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import React, { useMemo, useRef } from 'react'
import tw from 'twin.macro'
import { useResizable } from '../../components'
import {
  defaultHeaderHeight,
  editorPaneHeight,
  sidebarWidth,
} from './constants'
import { DashboardTemplateConfigPane } from './DashboardTemplate-ConfigPane'
import { DashboardTemplateEditorPane } from './DashboardTemplate-EditorPane'
import { DashboardTemplateExplorerPane } from './DashboardTemplate-ExplorerPane'
import { DashboardTemplateProps } from './types'

const { Sider, Header: AntDesignHeader } = Layout

export const DashboardTemplate = observer(
  ({
    children,
    Header,
    ExplorerPane,
    SidebarNavigation,
    ConfigPane,
    EditorPane,
    headerHeight,
    contentStyles,
  }: React.PropsWithChildren<DashboardTemplateProps>) => {
    const mainPaneResizable = useResizable({
      width: { default: 240, max: 460, min: 240 },
    })

    const metaPaneResizable = useResizable({
      width: { default: 300, max: 460, min: 240 },
      reverse: true,
    })

    const windowHeight = useWindowHeight()
    const headerContainerRef = useRef<HTMLDivElement>(null)
    const sideNavigationContainerRef = useRef<HTMLDivElement>(null)
    const [sideNavigationContainerWidth] = useSize(sideNavigationContainerRef)

    const mainContentMarginLeft = useMemo(() => {
      let result = sideNavigationContainerWidth

      if (ExplorerPane) {
        const w = mainPaneResizable.width.get()
        result += w
      }

      return result
    }, [sideNavigationContainerWidth, ExplorerPane, mainPaneResizable])

    // console.log({ mainContentMarginLeft, sideNavigationContainerWidth })

    const editorPaneResizable = useResizable({
      height: {
        default: 300,
        max: windowHeight - (headerContainerRef.current?.clientHeight || 0),
        min: editorPaneHeight.collapsed,
      },
    })

    const explorerPanePaddingBottom = useMemo(() => {
      let result = 40

      if (EditorPane) {
        const w = editorPaneResizable.height.get()
        result += w
      }

      return result
    }, [EditorPane, editorPaneResizable])

    return (
      <Layout
        css={css`
          min-height: 100% !important;
        `}
      >
        {SidebarNavigation && (
          <Sider
            collapsed
            collapsedWidth={sidebarWidth}
            style={{
              zIndex: 50,
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
            }}
            theme="light"
          >
            <div ref={sideNavigationContainerRef}>
              <SidebarNavigation />
            </div>
          </Sider>
        )}

        <Layout>
          {/* Header */}
          {Header && (
            <AntDesignHeader
              style={{
                zIndex: 50,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: `calc(100% - ${SidebarNavigation ? sidebarWidth : 0}px)`,
                height: headerHeight ?? defaultHeaderHeight,
                marginLeft: SidebarNavigation ? sidebarWidth : 0,
                background: 'initial',
              }}
            >
              <div ref={headerContainerRef}>
                <Header />
              </div>
            </AntDesignHeader>
          )}

          {/* Explorer Pane */}
          <Layout style={contentStyles}>
            {ExplorerPane && (
              <DashboardTemplateExplorerPane
                ExplorerPane={ExplorerPane}
                hasHeader={!!Header}
                hasSidebarNavigation={!!SidebarNavigation}
                headerHeight={headerHeight ?? defaultHeaderHeight}
                paddingBottom={explorerPanePaddingBottom}
                resizable={mainPaneResizable}
              />
            )}

            {/* Main Content */}
            <motion.main
              css={tw`relative p-2 flex-auto`}
              style={{
                marginTop: Header ? headerHeight ?? defaultHeaderHeight : 0,
                marginLeft: mainContentMarginLeft,
                marginRight: ConfigPane ? metaPaneResizable.width : undefined,
              }}
            >
              <div>{children}</div>
            </motion.main>

            {/* Config Pane */}
            <AnimatePresence initial={false}>
              {ConfigPane && (
                <DashboardTemplateConfigPane
                  ConfigPane={ConfigPane}
                  // hasConfigPane={Boolean(ExplorerPane)}
                  // hasSidebarNavigation={Boolean(SidebarNavigation)}
                  // mainPaneWidth={mainPaneResizable.width}
                  resizable={metaPaneResizable}
                />
              )}
            </AnimatePresence>

            {/* Editor Pane */}
            <AnimatePresence initial={false}>
              {EditorPane && (
                <DashboardTemplateEditorPane
                  ConfigPane={ConfigPane}
                  EditorPane={EditorPane}
                  metaPaneResizable={metaPaneResizable}
                  resizable={editorPaneResizable}
                />
              )}
            </AnimatePresence>
          </Layout>
        </Layout>
      </Layout>
    )
  },
)

DashboardTemplate.displayName = 'DashboardTemplate'
