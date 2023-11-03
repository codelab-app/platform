import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Logo = () => {
  return (
    <Link className="flex items-center" href="/">
      <Image
        alt="Codelab Logo"
        className="hover:cursor-pointer"
        height={42}
        src="/logo.svg"
        width={123}
      />
    </Link>
  )
}
