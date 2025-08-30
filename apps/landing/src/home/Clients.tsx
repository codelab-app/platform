'use client'

import { CuiContainer } from '../components/CuiContainer'
import { TestimonialSection } from './TestimonialSection'

export const Clients = () => {
  return (
    <section className="bg-slate-700" id="home-client">
      <CuiContainer className="w-full" size="md">
        <TestimonialSection />
      </CuiContainer>
    </section>
  )
}
