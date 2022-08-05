import { PlayCircleOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Image } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export const WatchTutorial = () => {
  return (
    <div
      css={[
        css`
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
        `,
        tw`hover:cursor-pointer relative`,
      ]}
    >
      <Image css={tw`mt-8 `} preview={false} src="/banner-screenshot.png" />
      <div
        className="watch-content"
        css={[
          tw`absolute bg-white z-10 text-2xl flex justify-center`,
          css`
            width: 640px;
            height: 80px;
            left: calc(50% - 320px);
            top: calc(50% - 40px);
          `,
        ]}
      >
        <PlayCircleOutlined css={tw`w-12 text-3xl mt-6`} />
        <span
          css={[
            tw`flex self-center text-2xl`,
            css`
              line-height: 80px;
            `,
          ]}
        >
          Watch how to build a products page with Shopify.
        </span>
      </div>
    </div>
  )
}
