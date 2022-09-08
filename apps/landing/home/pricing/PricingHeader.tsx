import { Switch } from 'antd'
import * as React from 'react'
import tw from 'twin.macro'

export const PricingHeader = () => {
  return (
    <section>
      <div
        css={tw`w-11/12 m-auto xl:container pb-7 sm:pb-14 mt-5 sm:mt-10 md:mt-20`}
      >
        <h1 css={tw`text-center text-2xl sm:text-3xl md:text-5xl`}>
          Compare Pricing
        </h1>
        <p
          css={tw`text-base sm:text-lg md:text-xl px-8 md:px-0  text-center text-slate-500`}
        >
          Whether you're trying out our product, or building your next startup,
          we have you covered with our different plans
        </p>
        <div
          css={tw`flex flex-col sm:flex-row text-sm sm:text-base md:text-lg items-center justify-center`}
        >
          <div css={tw`sm:mr-4 mr-0 sm:mb-0 mb-4`}>
            <span>Monthly</span>
            <Switch css={tw`bg-blue-500 mx-4`} defaultChecked />
            <span>Yearly</span>
          </div>

          <span
            css={tw`bg-violet-200 py-1 px-2 text-violet-700 text-sm md:text-base`}
          >
            Save up to 25%
          </span>
        </div>
      </div>
    </section>
  )
}
