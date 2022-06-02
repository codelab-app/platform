import { faArrowRightToBracket } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

export const MenuDesktop = () => {
  return (
    <nav className="nav">
      <menu className="menu menu-horizontal" css={[tw`m-0 p-0`]}>
        <ul css={tw`tablet:justify-between`}>
          <li css={tw`justify-start`}>
            <a css={tw`flex items-center`}>
              <Image
                alt="Codelab Logo"
                height={26}
                layout="fixed"
                src="/codelab-logo-default.svg"
                width={90}
              />
            </a>
          </li>
          {/* Used to push other items to the end */}
          <li css={tw`flex-grow hidden laptop:flex`}>{}</li>
          <li css={tw`hidden laptop:flex`}>
            <a>Features</a>
          </li>
          <li css={tw`hidden laptop:flex`}>
            <a>Docs</a>
          </li>
          <li css={tw`hidden laptop:flex`}>
            <a>Pricing</a>
          </li>
          <li css={tw`hidden laptop:flex`}>
            <a>Tutorials</a>
          </li>
          <li css={tw`tablet:w-8 laptop:w-auto`}>
            <a className="btn-primary inverse">
              <FontAwesomeIcon
                css={tw`laptop:hidden`}
                icon={faArrowRightToBracket}
              />
              <span css={tw`hidden laptop:block`}>Log In</span>
            </a>
          </li>
          <li css={tw`hidden laptop:flex`}>
            <a className="btn-primary">Sign Up</a>
          </li>
        </ul>
      </menu>
    </nav>
  )
}
