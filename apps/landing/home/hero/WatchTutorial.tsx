import { PlayCircleOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import React from 'react'

export const WatchTutorial = () => {
  return (
    <div
      className="relative cursor-pointer"
      css={`
        &:hover img {
          transform: scale(0.92);
          transition-duration: 0.6s;
        }
        &:hover .watch-content {
          transform: scale(1.08);
          transition-duration: 0.6s;
        }
        & img,
        & .watch-content {
          transition-duration: 0.6s;
        }
      `}
    >
      <Image className="mt-8" preview={false} src="/banner-screenshot.png" />
      <div
        className="watch-content absolute z-10 flex justify-center bg-white text-2xl"
        css={`
          width: 640px;
          height: 80px;
          left: calc(50% - 320px);
          top: calc(50% - 40px);
        `}
      >
        <PlayCircleOutlined className="mt-6 w-12 text-3xl" />
        <span
          className="flex self-center text-2xl"
          css={`
            line-height: 80px;
          `}
        >
          Watch how to build a products page with Shopify.
        </span>
      </div>
    </div>
  )
}
