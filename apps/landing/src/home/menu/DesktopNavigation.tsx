import { Button } from 'antd'
import Link from 'next/link'

import { useAuthUrl } from '../auth/use-auth-url'
import { Logo } from '../logo/Logo'
import { menuItems } from './MenuContainer'

export const MenuDesktop = () => {
  const user = false
  const { loginUrl } = useAuthUrl()

  return (
    <nav className="w-full bg-white">
      <menu className="m-0 h-[67px] p-0">
        <ul
          className={`
            container mx-auto flex h-full flex-row items-center justify-between p-0
            md:px-6
            2xl:px-8
          `}
        >
          <li className="flex justify-start p-2">
            <Logo />
          </li>
          {/* Right side navigation items */}
          <li className="flex items-center">
            <ul className="flex flex-row items-center">
              {menuItems.map((items, index) => (
                <li
                  className={`
                    laptop:flex
                    mr-4 flex p-2 text-base
                  `}
                  key={index}
                >
                  <Link
                    className={`
                      flex items-center font-display font-normal text-black
                      hover:text-primary
                    `}
                    href={items.href}
                  >
                    {items.title}
                  </Link>
                </li>
              ))}
              {/* eslint-disable-next-line
              @typescript-eslint/no-unnecessary-condition */}
              {user ? (
                <li
                  className={`
                    laptop:flex
                    hidden p-2
                  `}
                >
                  <Link
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className="btn-primary flex items-center"
                    href={loginUrl}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li
                    className={`
                      laptop:flex laptop:w-auto
                      tablet:w-8
                      flex p-2
                    `}
                  >
                    {/* <Link href="/auth/login" legacyBehavior> */}
                    <Link href={loginUrl}>
                      <Button className="mr-2 rounded-lg" type="primary">
                        Log in
                      </Button>
                    </Link>
                    {/* </Link> */}
                  </li>
                  <li
                    className={`
                      laptop:flex
                      flex p-2
                    `}
                  >
                    {/* <Link href="/auth/logout" legacyBehavior> */}
                    <Link href={loginUrl}>
                      <Button className="rounded-lg" type="primary">
                        Sign up
                      </Button>
                    </Link>
                    {/* </Link> */}
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </menu>
    </nav>
  )
}
