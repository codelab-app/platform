import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { Logo } from '../logo/Logo'
import { menuItems } from './MenuContainer'

export const MenuDesktop = () => {
  const { user } = useUser()

  return (
    <nav>
      <menu css={[tw`m-0 p-0 bg-white h-[67px] w-full`]}>
        <ul
          css={[
            tw`tablet:justify-between p-0 px-0 md:px-6 2xl:px-8 flex-row items-center flex h-full`,
          ]}
        >
          <li css={tw`justify-start flex p-2`}>
            <Logo />
          </li>
          {/* Used to push other items to the end */}
          <li css={tw`flex-grow hidden laptop:flex`}>{}</li>
          {menuItems.map((items, index) => (
            <li
              css={tw`hidden laptop:flex text-base flex p-2 mr-4`}
              key={index}
            >
              <Link
                css={tw`flex items-center text-black hover:text-primary font-display font-normal`}
                href={items.href}
              >
                {items.title}
              </Link>
            </li>
          ))}

          {user ? (
            <li css={tw`hidden laptop:flex p-2`}>
              <Link
                className="btn-primary"
                css={tw`flex  items-center`}
                href="/api/auth/login"
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li css={tw`tablet:w-8 laptop:w-auto laptop:flex p-2`}>
                {/* <Link href="/api/auth/login" legacyBehavior> */}
                <Button css={tw`rounded-lg mr-2`} ghost type="primary">
                  <Link
                    css={tw`hidden text-base font-semibold laptop:flex items-center`}
                    href="/api/auth/login"
                  >
                    Log in
                  </Link>
                </Button>
                {/* </Link> */}
              </li>
              <li css={tw`hidden laptop:flex p-2`}>
                {/* <Link href="/api/auth/logout" legacyBehavior> */}
                <Button css={tw`rounded-lg`} type="primary">
                  <Link
                    css={tw`hidden text-base font-semibold laptop:flex items-center`}
                    href="/api/auth/logout"
                  >
                    Sign up
                  </Link>
                </Button>
                {/* </Link> */}
              </li>
            </>
          )}
        </ul>
      </menu>
    </nav>
  )
}
