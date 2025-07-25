import { Button } from 'antd'
import Link from 'next/link'

import { Logo } from '../logo/Logo'
import { menuItems } from './MenuContainer'

export const MenuDesktop = () => {
  const user = false

  return (
    <nav>
      <menu className="m-0 h-[67px] w-full bg-white p-0">
        <ul
          className={`
            tablet:justify-between
            flex h-full flex-row items-center p-0
            md:px-6
            2xl:px-8
          `}
        >
          <li className="flex justify-start p-2">
            <Logo />
          </li>
          {/* Used to push other items to the end */}
          <li
            className={`
              laptop:flex
              hidden grow
            `}
          ></li>
          {menuItems.map((items, index) => (
            <li
              className={`
                laptop:flex
                mr-4 hidden p-2 text-base
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
                href="/auth/login"
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
                  p-2
                `}
              >
                {/* <Link href="/auth/login" legacyBehavior> */}
                <Button className="mr-2 rounded-lg" ghost type="primary">
                  <Link
                    className={`
                      laptop:flex
                      hidden items-center text-base font-semibold
                    `}
                    href="/auth/login"
                  >
                    Log in
                  </Link>
                </Button>
                {/* </Link> */}
              </li>
              <li
                className={`
                  laptop:flex
                  hidden p-2
                `}
              >
                {/* <Link href="/auth/logout" legacyBehavior> */}
                <Button className="rounded-lg" type="primary">
                  <Link
                    className={`
                      laptop:flex
                      hidden items-center text-base font-semibold
                    `}
                    href="/auth/logout"
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
