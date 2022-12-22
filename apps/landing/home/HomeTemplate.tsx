import { useMobileOrTabletMediaQuery } from '@codelab/frontend/shared/style'
import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import tw from 'twin.macro'
import { Footer } from '../sections/footer/Footer'
import { MenuDesktop } from './menu/DesktopNavigation'
import { CodelabMenuContainer } from './menu/MenuContainer'
import { menuState } from './menu/menuState'
import { MenuMobile } from './menu/MobileMenu'

export type HomeTemplateProps = React.PropsWithChildren

const Header = ({ children }: PropsWithChildren) => {
  return <header>{children}</header>
}

const Layout = ({ children }: PropsWithChildren) => {
  const isMenuOpen = useRecoilValue(menuState)

  return (
    <div css={[isMenuOpen || tw`backdrop-blur`]} id="home">
      {children}
    </div>
  )
}

const Content = ({ children }: PropsWithChildren) => {
  return <section>{children}</section>
}

export const HomeTemplate = ({ children }: HomeTemplateProps) => {
  const isMobileOrTablet = useMobileOrTabletMediaQuery()
  // While rendering your application, there was a difference between the React tree that was pre-rendered (SSR/SSG) and the React tree that rendered during the first render in the Browser.
  // The first render is called Hydration which is a feature of React.
  // This can cause the React tree to be out of sync with the DOM and result in unexpected content/attributes being present.
  // Possible Ways to Fix It - https://github.com/vercel/next.js/discussions/35773#discussioncomment-2485078
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted ? (
    <Layout>
      <Header>
        <CodelabMenuContainer>
          <>{isMobileOrTablet ? <MenuMobile /> : <MenuDesktop />}</>
        </CodelabMenuContainer>
      </Header>
      <Content>{children}</Content>
      <Footer></Footer>
    </Layout>
  ) : null
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
