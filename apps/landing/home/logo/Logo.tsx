import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

export const Logo = () => {
  return (
    <a css={tw`flex items-center`} href="">
      <Image
        alt="Codelab Logo"
        height={42}
        layout="fixed"
        src="/logo.svg"
        width={123}
      />
    </a>
  )
}
