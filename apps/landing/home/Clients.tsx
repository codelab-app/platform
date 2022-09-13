import React from 'react'
import tw from 'twin.macro'
import { TestimonialSection } from './TestimonialSection'

export const Clients = () => {
  return (
    <section css={tw`bg-slate-700`} id="home-client">
      <div css={tw`m-auto w-full md:container`}>
        <TestimonialSection />
      </div>
    </section>
  )
}
