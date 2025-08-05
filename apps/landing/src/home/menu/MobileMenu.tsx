import {
  faDiscord,
  faFacebook,
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useOutsideClick } from 'rooks'
import styled from 'styled-components'

import { Logo } from '../logo/Logo'
import { HamburgerIcon } from './HamburgerIcon'
import { useMenuState } from './MenuContext'

const SpaceEvenly = styled.div.attrs({
  className: 'flex flex-row justify-between items-center flex-grow py-6 px-12',
})`
  & > * {
    display: flex;
  }
`

interface BackdropProps {
  active: boolean
  onClick(): void
}

const Backdrop = ({ active, onClick }: BackdropProps) => {
  const body = document.querySelector('body')

  if (!body) {
    throw new Error('Missing body')
  }

  return createPortal(
    <div
      className={classNames(
        'fixed top-0 left-0 z-40 transition-all duration-500 ease-out',
        active
          ? 'backdrop-blur-sm bg-black/20 w-screen h-screen opacity-100'
          : 'opacity-0 pointer-events-none',
      )}
      id="backdrop"
      onClick={onClick}
    />,
    body,
  )
}

export const MenuMobile = () => {
  const { isMenuOpen, setMenuOpen } = useMenuState()
  const ref = useRef(null)

  useOutsideClick(ref, () => {
    if (isMenuOpen) {
      toggleMenu()
    }
  })

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Backdrop active={isMenuOpen} onClick={toggleMenu} />
      <nav ref={ref}>
        <SpaceEvenly>
          <Logo />
          <button
            className={`
              border-0 bg-white p-2
              hover:cursor-pointer
            `}
            onClick={toggleMenu}
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>
        </SpaceEvenly>
        <menu
          className={classNames(
            !isMenuOpen && '-translate-x-full',
            'transition-transform fixed top-0 p-0 m-0 bottom-0 w-4/5 h-screen bg-white transform-gpu duration-500 ease-in-out shadow-lg left-0 z-50',
          )}
        >
          <div className="h-full p-10">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                className={`
                  border-0 bg-transparent p-2
                  hover:cursor-pointer
                `}
                onClick={toggleMenu}
              >
                <HamburgerIcon isOpen={true} />
              </button>
            </div>
            <ul className="flex flex-col p-0 pt-4">
              {menuItems.map((items, index) => (
                <li
                  className={classNames(
                    'pt-8 text-base list-none transition-all duration-500 ease-out',
                    isMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-8',
                  )}
                  key={index}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 75}ms` : '0ms',
                  }}
                >
                  <Link
                    className={`
                      flex items-center font-display font-normal text-black
                      hover:text-primary
                    `}
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
              {[faTwitter, faFacebook, faGithub, faYoutube, faDiscord].map(
                (icon, index) => (
                  <li
                    className={classNames(
                      'list-none text-2xl transition-all duration-500 ease-out',
                      isMenuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4',
                    )}
                    key={index}
                    style={{
                      transitionDelay: isMenuOpen
                        ? `${(menuItems.length + index) * 75}ms`
                        : '0ms',
                    }}
                  >
                    <FontAwesomeIcon icon={icon} />
                  </li>
                ),
              )}
            </ul>
          </div>
        </menu>
      </nav>
    </>
  )
}

const menuItems = [
  {
    href: '/features',
    icon: '/features.svg',
    title: 'Features',
  },
  {
    href: '/docs',
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
