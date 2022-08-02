import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

export const MenuDesktop = () => {
  const { user } = useUser()

  return (
    <nav className="nav">
      <menu
        className="menu menu-horizontal"
        css={[tw`m-0 p-0 bg-white w-full`]}
        style={{
          height: '50px',
        }}
      >
        <ul css={[tw`tablet:justify-between flex-row flex h-full`]}>
          <li css={tw`justify-start flex px-2`}>
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
          <li css={tw`hidden laptop:flex flex px-2`}>
            <a css={tw`flex items-center`}>Features</a>
          </li>
          <li css={tw`hidden laptop:flex px-2`}>
            <a css={tw`flex items-center`}>Docs</a>
          </li>
          <li css={tw`hidden laptop:flex px-2`}>
            <a css={tw`flex items-center`}>Pricing</a>
          </li>
          <li css={tw`hidden laptop:flex px-2`}>
            <a css={tw`flex items-center`}>Tutorials</a>
          </li>
          {user ? (
            <>
              <li css={tw`hidden laptop:flex px-2`}>
                <Link className="btn-primary" href="/api/auth/logout">
                  <a css={tw`flex items-center`}>Register</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li css={tw`tablet:w-8 laptop:w-auto laptop:flex px-2`}>
                <Link className="btn-primary inverse" href="/api/auth/login">
                  {/* <FontAwesomeIcon */}
                  {/*  css={tw`laptop:hidden`} */}
                  {/*  icon={faArrowRightToBracket} */}
                  {/*/ > */}
                  <a css={tw`hidden laptop:flex items-center`}>Login</a>
                </Link>
              </li>
              <li css={tw`hidden laptop:flex px-2`}>
                <Link className="btn-primary" href="/api/auth/login">
                  <a css={tw`flex items-center`}>Register</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </menu>
    </nav>
  )
}
