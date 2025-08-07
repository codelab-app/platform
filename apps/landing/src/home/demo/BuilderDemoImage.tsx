'use client'

import { Image } from 'antd'

export const BuilderDemoImage = () => {
  return (
    <div className="w-full">
      <Image
        alt="Codelab Builder Demo"
        className="w-full rounded-lg shadow-lg"
        preview={false}
        src="/banner-screenshot.png"
      />
    </div>
  )
}
