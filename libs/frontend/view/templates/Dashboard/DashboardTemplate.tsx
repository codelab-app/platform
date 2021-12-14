import {
  componentLikeDestructure,
  ComponentTypeLike,
} from '@codelab/frontend/shared/utils'
import { css } from '@emotion/react'
import { Layout } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import tw from 'twin.macro'
import { useResizable } from '../../components'
import { defaultHeaderHeight, sidebarNavigationWidth } from './constants'
import DashboardTemplateMainPane from './DashboardTemplateMainPane'
import { DashboardTemplateMetaPane } from './DashboardTemplateMetaPane'

const { Sider, Header: AntDesignHeader } = Layout

export interface DashboardTemplateProps {
  Header?: ComponentTypeLike | null
  MetaPane?: ComponentTypeLike | null
  MainPane?: ComponentTypeLike | null
  SidebarNavigation?: ComponentTypeLike | null
  headerHeight?: number
}

export const DashboardTemplate = ({
  children,
  Header,
  MetaPane,
  SidebarNavigation,
  MainPane,
  headerHeight,
}: React.PropsWithChildren<DashboardTemplateProps>) => {
  const [HeaderComponent, headerProps] = componentLikeDestructure(Header)

  const [SidebarNavigationComponent, sidebarNavigationProps] =
    componentLikeDestructure(SidebarNavigation)

  const mainPaneResizable = useResizable({
    width: { default: 300, max: 600, min: 300 },
  })

  const metaPaneResizable = useResizable({
    height: { default: 320, max: 400, min: 5 },
  })

  return (
    <Layout
      css={css`
        min-height: 100% !important;
      `}
    >
      {SidebarNavigation && (
        <Sider
          theme="light"
          collapsed
          collapsedWidth={40}
          style={{
            zIndex: 50,
            maxHeight: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <div css={tw`h-full`}>
            <SidebarNavigationComponent {...sidebarNavigationProps} />
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
              width: `calc(100% - ${
                SidebarNavigation ? sidebarNavigationWidth : 0
              }px)`,
              height: headerHeight ?? defaultHeaderHeight,
              marginLeft: SidebarNavigation ? sidebarNavigationWidth : 0,
            }}
          >
            <HeaderComponent {...headerProps} />
          </AntDesignHeader>
        )}

        <Layout>
          {MainPane && (
            <DashboardTemplateMainPane
              headerHeight={headerHeight ?? defaultHeaderHeight}
              MainPane={MainPane}
              hasHeader={!!Header}
              hasSidebarNavigation={!!SidebarNavigation}
              resizable={mainPaneResizable}
            />
          )}

          <motion.main
            css={tw`relative p-2 flex-auto`}
            style={{
              marginTop: Header ? headerHeight ?? defaultHeaderHeight : 0,
              marginLeft: MainPane ? mainPaneResizable.width : undefined,
            }}
          >
            <div
              style={{
                marginLeft: SidebarNavigation ? sidebarNavigationWidth : 0,
              }}
            >
              {children}
            </div>
          </motion.main>

          <AnimatePresence initial={false}>
            {MetaPane && (
              <DashboardTemplateMetaPane
                hasSidebarNavigation={!!SidebarNavigation}
                MetaPane={MetaPane}
                resizable={metaPaneResizable}
                hasMainPane={!!MainPane}
                mainPaneWidth={mainPaneResizable.width}
              />
            )}
          </AnimatePresence>
        </Layout>
      </Layout>
    </Layout>
  )
}
