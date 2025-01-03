import type { PropsWithChildren, ReactNode } from 'react'

const Layout = async ({
  children,
  modal,
}: PropsWithChildren & { modal: ReactNode }) => {
  return (
    <>
      {children}
      {modal}
    </>
  )
}

export default Layout
