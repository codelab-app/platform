import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

export const Logo = () => {
  return (
    <Link css={tw`flex items-center `} href="/" legacyBehavior>
      <Image
        alt="Codelab Logo"
        css={tw`hover:cursor-pointer`}
        height={42}
        layout="fixed"
        src="/logo.svg"
        width={123}
      />
    </Link>
  )
}
