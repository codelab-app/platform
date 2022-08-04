import { useMobileOrTabletMediaQuery } from '@codelab/frontend/shared/style'
import { contentStyle } from '@codelab/frontend/view/style'
import React, { PropsWithChildren } from 'react'
import { useRecoilValue } from 'recoil'
import tw from 'twin.macro'
import { MenuDesktop } from './menu/DesktopNavigation'
import { CodelabMenuContainer } from './menu/MenuContainer'
import { menuState } from './menu/menuState'
import { MenuMobile } from './menu/MobileNavigation'

export type HomeTemplateProps = React.PropsWithChildren

const Header = ({ children }: PropsWithChildren<any>) => {
  return <header>{children}</header>
}

const Layout = ({ children }: PropsWithChildren<any>) => {
  const isMenuOpen = useRecoilValue(menuState)

  return (
    <div css={[isMenuOpen ?? tw`backdrop-blur`]} id="home">
      {children}
    </div>
  )
}

const Content = ({ children }: PropsWithChildren<any>) => {
  return <section>{children}</section>
}

const Footer = ({ children }: PropsWithChildren<any>) => {
  return <footer>{children}</footer>
}

export const HomeTemplate = ({ children }: HomeTemplateProps) => {
  const isMobileOrTablet = useMobileOrTabletMediaQuery()

  if (typeof window === 'undefined') {
    return <></>
  }

  return (
    <Layout>
      <Header>
        <CodelabMenuContainer>
          <>{isMobileOrTablet ? <MenuMobile /> : <MenuDesktop />}</>
        </CodelabMenuContainer>
      </Header>
      <Content className="container" style={contentStyle}>
        {children}
      </Content>
      <Footer>
        <span>Codelab.ai ©2020</span>
      </Footer>
    </Layout>
  )
}
