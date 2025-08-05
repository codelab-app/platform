'use client'

import type { PropsWithChildren, ReactElement } from 'react'

import { breakpoints } from '@codelab/shared-config-builder'
import { useMediaQuery } from 'react-responsive'

import { Footer } from '../footer/Footer'
import { MenuDesktop } from './menu/DesktopNavigation'
import { CodelabMenuContainer } from './menu/MenuContainer'
import { MenuMobile } from './menu/MobileMenu'

export interface HomeTemplateProps {
  children: ReactElement<unknown>
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
      <Content>{children}</Content>
      <Footer></Footer>
    </Layout>
  )
}

// const LayoutTest = ({ children }: PropsWithChildren<any>) => {
//   const isMenuOpen = useRecoilValue(menuState)

//   return (
//     <div css={[isMenuOpen ?? tw`backdrop-blur`]} id="home">
//       {children}
//     </div>
//   )
// }

// export const Layout2 = ({ children }: any) => (
//   <LayoutTest>
//     <Header>
//       <CodelabMenuContainer>
//         <MenuDesktop />
//       </CodelabMenuContainer>
//     </Header>
//     <Content>{children}</Content>
//     <Footer></Footer>
//   </LayoutTest>
// )

export default HomeTemplate
