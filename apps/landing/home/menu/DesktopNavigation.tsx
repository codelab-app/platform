import { useUser } from '@auth0/nextjs-auth0'
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
      <menu
        css={[tw`m-0 p-0 bg-white w-full`]}
        style={{
          height: '68px',
        }}
      >
        <ul
          css={[
            tw`tablet:justify-between p-0 flex-row items-center flex h-full`,
          ]}
        >
          <li css={tw`justify-start flex p-2`}>
            <Logo />
          </li>
          {/* Used to push other items to the end */}
          <li css={tw`flex-grow hidden laptop:flex`}>{}</li>
          {menuItems.map((items) => (
            <li css={tw`hidden laptop:flex text-base flex p-2 mr-4`}>
              <a
                css={tw`flex items-center text-black hover:text-primary font-display font-normal`}
                href={items.href}
              >
                {items.title}
              </a>
            </li>
          ))}

          {user ? (
            <li css={tw`hidden laptop:flex p-2`}>
              <Link className="btn-primary" href="/api/auth/login">
                <a css={tw`flex  items-center`}>Logout</a>
              </Link>
            </li>
          ) : (
            <>
              <li css={tw`tablet:w-8 laptop:w-auto laptop:flex p-2`}>
                <Link href="/api/auth/login">
                  <Button css={tw`rounded-lg mr-2`} ghost type="primary">
                    <a
                      css={tw`hidden text-base font-semibold laptop:flex items-center`}
                    >
                      Log in
                    </a>
                  </Button>
                </Link>
              </li>
              <li css={tw`hidden laptop:flex p-2`}>
                <Link href="/api/auth/logout">
                  <Button css={tw`rounded-lg`} type="primary">
                    <a
                      css={tw`hidden text-base font-semibold laptop:flex items-center`}
                    >
                      Sign up
                    </a>
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </menu>
    </nav>
  )
}
