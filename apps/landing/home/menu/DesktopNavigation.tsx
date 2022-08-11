import { useUser } from '@auth0/nextjs-auth0'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

export const MenuDesktop = () => {
  const { user } = useUser()

  return (
    <nav>
      <menu
        css={[tw`m-0 p-0 bg-white w-full`]}
        style={{
          height: '50px',
        }}
      >
        <ul css={[tw`tablet:justify-between p-0 flex-row flex h-full`]}>
          <li css={tw`justify-start flex p-2`}>
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
          <li css={tw`hidden laptop:flex flex p-2 ml-6`}>
            <a
              css={tw`flex items-center text-black hover:text-primary font-display font-bold`}
            >
              Use Cases
            </a>
          </li>
          {/* <li css={tw`hidden laptop:flex px-2 text-black`}> */}
          {/*  <a css={tw`flex items-center`}>Docs</a> */}
          {/* </li> */}
          <li css={tw`hidden laptop:flex p-2`}>
            <a css={tw`flex items-center font-display font-bold`}>Showcases</a>
          </li>
          <li css={tw`hidden laptop:flex p-2`}>
            <a css={tw`flex items-center font-display font-bold`}>Pricing</a>
          </li>
          <li css={tw`flex-grow hidden laptop:flex`}>{}</li>
          {user ? (
            <li css={tw`hidden laptop:flex p-2`}>
              <Link className="btn-primary" href="/api/auth/login">
                <a css={tw`flex items-center`}>Logout</a>
              </Link>
            </li>
          ) : (
            <>
              <li css={tw`tablet:w-8 laptop:w-auto laptop:flex p-2`}>
                <Link href="/api/auth/login">
                  {/* <FontAwesomeIcon */}
                  {/*  css={tw`laptop:hidden`} */}
                  {/*  icon={faArrowRightToBracket} */}
                  {/*/ > */}
                  <Button ghost type="primary">
                    <a css={tw`hidden laptop:flex items-center`}>Log in</a>
                  </Button>
                </Link>
              </li>
              <li css={tw`hidden laptop:flex p-2`}>
                <Link href="/api/auth/logout">
                  <Button type="primary">
                    <a css={tw`flex items-center`}>Sign up</a>
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
