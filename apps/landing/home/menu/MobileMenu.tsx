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
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useRecoilState } from 'recoil'
import { useOutsideClick } from 'rooks'
import tw from 'twin.macro'
import { Logo } from '../logo/Logo'
import { menuState } from './menuState'
import style from './mobileNavigation.module.css'

console.log(style)

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
          className="btn hover-text bg-white border-0"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon css={tw`text-xl`} icon={faBars} />
        </button>
      </SpaceEvenly>
      <menu
        className="menu menu-vertical"
        css={[
          isMenuOpen ? tw`` : tw`-translate-x-full`,
          tw`transition transform-gpu duration-300 shadow-lg border-r-2`,
        ]}
        id={style.mobileMenu}
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
                  <img
                    alt="item-logo"
                    css={tw`mr-4`}
                    height={18}
                    src={items.icon}
                    width={20}
                  />
                  {items.title}
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
    icon: 'docs.svg',
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
