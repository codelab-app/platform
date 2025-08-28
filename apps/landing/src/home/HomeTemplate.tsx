'use client'

import type { PropsWithChildren, ReactNode } from 'react'

import { breakpoints } from '@codelab/shared-config-builder'
import { useMediaQuery } from 'react-responsive'

import { Footer } from '../footer/Footer'
import { MenuDesktop } from './menu/DesktopNavigation'
import { CodelabMenuContainer } from './menu/MenuContainer'
import { MenuMobile } from './menu/MobileMenu'

export interface HomeTemplateProps {
  children: Array<ReactNode> | ReactNode
}

const Header = ({ children }: PropsWithChildren) => {
  return <header>{children}</header>
}

const Layout = ({ children }: PropsWithChildren) => {
  return <div id="home">{children}</div>
}

const Content = ({ children }: PropsWithChildren) => {
  return <section>{children}</section>
}

const HomeTemplate = ({ children }: HomeTemplateProps) => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: breakpoints.Tablet.max })

  return (
    <Layout>
      <Header>
        <CodelabMenuContainer>
          <>{isMobileOrTablet ? <MenuMobile /> : <MenuDesktop />}</>
        </CodelabMenuContainer>
      </Header>
      <Content>{Array.isArray(children) ? <>{children}</> : children}</Content>
      <Footer></Footer>
    </Layout>
  )
}

export default HomeTemplate
