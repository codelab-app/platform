import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  faDiscord,
  faFacebook,
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faBars } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useRecoilState } from 'recoil'
import { useOutsideClick } from 'rooks'
import tw from 'twin.macro'
import { Logo } from '../logo/Logo'
import { menuState } from './menuState'

const SpaceEvenly = styled.div(
  tw`
  flex flex-row  justify-between items-center flex-grow p-6
`,
  css`
    & > * {
      display: flex;
    }
  `,
)

type BackdropProps = {
  active: boolean
}

const Backdrop = ({ active }: BackdropProps) => {
  const body = document.querySelector('body')

  if (!body) {
    throw new Error('Missing body')
  }

  return ReactDOM.createPortal(
    <div
      css={[
        tw`fixed w-screen h-screen top-0`,
        active && tw`backdrop-blur-sm bg-white/5`,
      ]}
      id="backdrop"
    />,
    body,
  )
}

export const MenuMobile = () => {
  const [isMenuOpen, setMenu] = useRecoilState(menuState)
  const ref = useRef(null)

  useOutsideClick(ref, () => {
    if (isMenuOpen) {
      toggleMenu()
    }
  })

  const toggleMenu = () => {
    setMenu(!isMenuOpen)
  }

  return (
    <nav ref={ref}>
      <Backdrop active={isMenuOpen} />
      <SpaceEvenly>
        <Logo />
        <button
          css={tw`bg-white border-0 hover:cursor-pointer`}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon css={tw`text-xl`} icon={faBars} />
        </button>
      </SpaceEvenly>
      <menu
        css={[
          isMenuOpen ? tw`` : tw`-translate-x-full`,
          tw`transition fixed top-0 p-0 m-0 bottom-0 w-4/5 h-screen bg-white transform-gpu duration-300 shadow-lg border-r-2`,
        ]}
      >
        <div css={tw`p-10 h-full`}>
          <div css={tw`flex items-center justify-between`}>
            <Logo />
            <FontAwesomeIcon css={tw`text-xl`} icon={faArrowLeft} />
          </div>
          <ul css={[tw` p-0 flex-col pt-4 flex`]}>
            {menuItems.map((items) => (
              <li css={tw`hidden laptop:flex pt-8 text-base flex`}>
                <a
                  css={tw`flex items-center text-black hover:text-primary  font-display font-normal`}
                  href={items.href}
                >
                  <Image
                    alt="item-logo"
                    height={18}
                    src={items.icon}
                    width={20}
                  />
                  <p css={tw`p-0 ml-4 mb-0 mt-0 mr-0`}>{items.title}</p>
                </a>
              </li>
            ))}
          </ul>
          <ul css={tw`flex items-center p-0 mt-10 justify-between`}>
            <li css={tw` text-3xl list-none`}>
              <FontAwesomeIcon icon={faTwitter} />
            </li>
            <li css={tw` text-3xl list-none`}>
              <FontAwesomeIcon icon={faFacebook} />
            </li>
            <li css={tw` text-3xl list-none`}>
              <FontAwesomeIcon icon={faGithub} />
            </li>
            <li css={tw` text-3xl list-none`}>
              <FontAwesomeIcon icon={faYoutube} />
            </li>
            <li css={tw` text-3xl list-none`}>
              <FontAwesomeIcon icon={faDiscord} />
            </li>
          </ul>
        </div>
      </menu>
    </nav>
  )
}

const menuItems = [
  {
    title: 'Features',
    href: '/',
    icon: '/features.svg',
  },
  {
    title: 'Docs',
    href: '/',
    icon: '/docs.svg',
  },
  {
    title: 'Pricing',
    href: '/',
    icon: '/pricing.svg',
  },
  {
    title: 'Tutorials',
    href: '/',
    icon: '/tutorials.svg',
  },
]
