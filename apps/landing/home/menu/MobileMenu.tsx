import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { faBars } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useRecoilState } from 'recoil'
import { useOutsideClick } from 'rooks'
import tw from 'twin.macro'
import { menuState } from './menuState'
import style from './mobileNavigation.module.css'

console.log(style)

const SpaceEvenly = styled.div(
  tw`
  flex flex-row justify-between flex-grow
`,
  css`
    & > * {
      display: flex;
    }
  `,
)

interface BackdropProps {
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
    <nav className="nav" css={tw`pr-2`} ref={ref}>
      <Backdrop active={isMenuOpen} />
      <SpaceEvenly>
        <button className="btn hover-text" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <a css={tw`flex items-center`}>
          <Image
            alt="Codelab Logo"
            height={26}
            layout="fixed"
            src="/codelab-logo-default.svg"
            width={90}
          />
        </a>
        <a className="btn btn-primary">Sign Up</a>
      </SpaceEvenly>
      <menu
        className="menu menu-vertical"
        css={[
          isMenuOpen ? tw`` : tw`-translate-x-full`,
          tw`transition transform-gpu duration-300`,
        ]}
        id={style.mobileMenu}
      >
        <ul>
          <li>
            <a>Features</a>
          </li>
          <li>
            <a>Docs</a>
          </li>
          <li>
            <a>Pricing</a>
          </li>
          <li>
            <a>Tutorials</a>
          </li>
        </ul>
      </menu>
    </nav>
  )
}
