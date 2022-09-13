import React from 'react'
import tw from 'twin.macro'

export const TutorialsHeader = () => {
  return (
    <section css={tw`w-11/12 xl:container m-auto`}>
      <div
        css={tw`w-11/12 m-auto xl:container pb-7 sm:pb-14 mt-5 sm:mt-10 md:mt-20`}
      >
        <h1 css={tw`text-center text-2xl sm:text-3xl md:text-5xl`}>
          Learn To Build
        </h1>
        <p
          css={tw`w-full xl:w-3/5 m-auto text-base sm:text-lg md:text-xl px-8 md:px-0  text-center text-slate-500`}
        >
          Checkout our different tutorials for building different types of user
          interfaces. From simple to complex, we've got you covered.
        </p>
      </div>
    </section>
  )
}
