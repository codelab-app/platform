import { css } from '@emotion/react'
import { useWindowHeight } from '@react-hook/window-size'
import { Layout } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
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
import type { DashboardTemplateProps } from './types'

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
      width: { default: 360, max: 460, min: 360 },
      reverse: true,
    })

    const windowHeight = useWindowHeight()
    const headerContainerRef = useRef<HTMLDivElement>(null)
    const sideNavigationContainerRef = useRef<HTMLDivElement>(null)

    const [sideNavigationContainerWidth, setSideNavigationContainerWidth] =
      useState(() => sideNavigationContainerRef.current?.offsetWidth ?? 0)

    useLayoutEffect(() => {
      const sideNavigation = sideNavigationContainerRef.current

      if (sideNavigation) {
        setSideNavigationContainerWidth(sideNavigation.offsetWidth)
      }
    }, [sideNavigationContainerRef])

    const [cuMainPaneWidth, setCurMainPaneWidth] = useState(
      mainPaneResizable.width.get(),
    )

    mainPaneResizable.width.onChange(() => {
      if (ExplorerPane) {
        setCurMainPaneWidth(mainPaneResizable.width.get())
      }
    })

    const mainContentMarginLeft = useMemo(() => {
      let result = sideNavigationContainerWidth

      if (ExplorerPane) {
        const w = cuMainPaneWidth
        result += w
      }

      return result
    }, [sideNavigationContainerWidth, ExplorerPane, cuMainPaneWidth])

    const editorPaneResizable = useResizable({
      height: {
        default: 300,
        max: windowHeight - (headerContainerRef.current?.clientHeight || 0),
        min: editorPaneHeight.collapsed,
      },
    })

    const [curEditorPaneHeight, setCurEditorPaneHeight] = useState(
      editorPaneResizable.height.get(),
    )

    editorPaneResizable.height.onChange(() => {
      setCurEditorPaneHeight(editorPaneResizable.height.get())
    })

    const explorerPanePaddingBottom = useMemo(() => {
      let result = 40

      if (EditorPane) {
        const h = curEditorPaneHeight
        result += h
      }

      return result
    }, [EditorPane, curEditorPaneHeight])

    const mainHeight = useMemo(() => {
      let result = windowHeight - 50

      if (EditorPane) {
        const h = curEditorPaneHeight
        result -= h
      }

      return result
    }, [EditorPane, curEditorPaneHeight, windowHeight])

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
            ref={sideNavigationContainerRef}
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
            <SidebarNavigation />
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
                hasHeader={Boolean(Header)}
                hasSidebarNavigation={Boolean(SidebarNavigation)}
                headerHeight={headerHeight ?? defaultHeaderHeight}
                paddingBottom={explorerPanePaddingBottom}
                resizable={mainPaneResizable}
              />
            )}

            {/* Main Content */}
            <motion.main
              css={tw`relative px-2 flex-auto`}
              style={{
                marginTop: Header ? headerHeight ?? defaultHeaderHeight : 0,
                marginLeft: mainContentMarginLeft,
                marginRight: ConfigPane ? metaPaneResizable.width : undefined,
              }}
            >
              <div
                style={{
                  height: mainHeight,
                }}
              >
                {children}
              </div>
            </motion.main>

            {/* Config Pane */}
            <AnimatePresence initial={false}>
              {ConfigPane && (
                <DashboardTemplateConfigPane
                  ConfigPane={ConfigPane}
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
