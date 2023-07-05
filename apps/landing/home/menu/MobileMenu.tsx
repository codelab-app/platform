import {
  faDiscord,
  faFacebook,
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faBars } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useRecoilState } from 'recoil'
import { useOutsideClick } from 'rooks'
import styled, { css } from 'styled-components'
import { Logo } from '../logo/Logo'
import { menuState } from './menu-state'

const SpaceEvenly = styled.div.attrs({
  className: 'flex flex-row justify-between items-center flex-grow py-6 px-12',
})`
  & > * {
    display: flex;
  }
`

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
      className={classNames(
        'fixed top-0',
        active && 'backdrop-blur-sm bg-white/5 w-screen h-screen',
      )}
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
          className="border-0 bg-white hover:cursor-pointer"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon className="text-xl" icon={faBars} />
        </button>
      </SpaceEvenly>
      <menu
        className={classNames(
          isMenuOpen && '-translate-x-full',
          'transition fixed top-0 p-0 m-0 bottom-0 w-4/5 h-screen bg-white transform-gpu duration-300 shadow-lg border-r-2',
        )}
      >
        <div className="h-full p-10">
          <div className="flex items-center justify-between">
            <Logo />
            <FontAwesomeIcon className="text-xl" icon={faArrowLeft} />
          </div>
          <ul className="flex flex-col p-0 pt-4">
            {menuItems.map((items, index) => (
              <li className="hidden pt-8 text-base laptop:flex" key={index}>
                <Link
                  className="flex items-center font-display font-normal  text-black hover:text-primary"
                  href={items.href}
                >
                  <Image
                    alt="item-logo"
                    height={18}
                    src={items.icon}
                    width={20}
                  />
                  <p className="my-0 ml-4 mr-0 p-0">{items.title}</p>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-10 flex items-center justify-between p-0">
            <li className="list-none text-2xl">
              <FontAwesomeIcon icon={faTwitter} />
            </li>
            <li className=" list-none text-2xl">
              <FontAwesomeIcon icon={faFacebook} />
            </li>
            <li className=" list-none text-2xl">
              <FontAwesomeIcon icon={faGithub} />
            </li>
            <li className=" list-none text-2xl">
              <FontAwesomeIcon icon={faYoutube} />
            </li>
            <li className=" list-none text-2xl">
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
    href: '/',
    icon: '/features.svg',
    title: 'Features',
  },
  {
    href: '/',
    icon: '/docs.svg',
    title: 'Docs',
  },
  {
    href: '/pricing',
    icon: '/pricing.svg',
    title: 'Pricing',
  },
  {
    href: '/tutorials',
    icon: '/tutorials.svg',
    title: 'Tutorials',
  },
]
