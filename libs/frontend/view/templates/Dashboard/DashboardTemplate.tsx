import { BuilderDashboardTemplateProps } from '@codelab/frontend/abstract/types'
import { css } from '@emotion/react'
import { Layout } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { useResizable } from '../../components'
import { defaultHeaderHeight, sidebarWidth } from './constants'
import { DashboardTemplateMainPane } from './DashboardTemplateMainPane'
import { DashboardTemplateMetaPane } from './DashboardTemplateMetaPane'

const { Sider, Header: AntDesignHeader } = Layout

export const DashboardTemplate = observer(
  ({
    children,
    Header,
    MetaPane,
    SidebarNavigation,
    MainPane,
    headerHeight,
    contentStyles,
  }: React.PropsWithChildren<BuilderDashboardTemplateProps>) => {
    const mainPaneResizable = useResizable({
      width: { default: 240, max: 460, min: 240 },
    })

    const metaPaneResizable = useResizable({
      width: { default: 300, max: 460, min: 240 },
      reverse: true,
    })

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
              maxHeight: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
            }}
            theme="light"
          >
            <div css={tw`h-full`}>
              <SidebarNavigation />
            </div>
          </Sider>
        )}

        <Layout>
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
              <Header />
            </AntDesignHeader>
          )}

          <Layout style={contentStyles}>
            {MainPane && (
              <DashboardTemplateMainPane
                MainPane={MainPane}
                hasHeader={!!Header}
                hasSidebarNavigation={!!SidebarNavigation}
                headerHeight={headerHeight ?? defaultHeaderHeight}
                resizable={mainPaneResizable}
              />
            )}

            <motion.main
              css={tw`relative p-2 flex-auto`}
              style={{
                marginTop: Header ? headerHeight ?? defaultHeaderHeight : 0,
                marginLeft: MainPane ? mainPaneResizable.width : undefined,
                marginRight: MetaPane ? metaPaneResizable.width : undefined,
              }}
            >
              <div
                style={{
                  marginLeft: SidebarNavigation ? sidebarWidth : 0,
                }}
              >
                {children}
              </div>
            </motion.main>

            <AnimatePresence initial={false}>
              {MetaPane && (
                <DashboardTemplateMetaPane
                  MetaPane={MetaPane}
                  hasMainPane={Boolean(MainPane)}
                  hasSidebarNavigation={Boolean(SidebarNavigation)}
                  mainPaneWidth={mainPaneResizable.width}
                  resizable={metaPaneResizable}
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
