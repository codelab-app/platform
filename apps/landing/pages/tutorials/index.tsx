/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { SeoHead } from 'apps/landing/home/SeoHead'
import { supabase } from 'apps/landing/utils/supabase'
import type { GetStaticProps } from 'next'
import * as React from 'react'
import type { ITutorialsItem, TutorialsBodyProps } from '../../home'
import { HomeTemplate, TutorialsBody, TutorialsHeader } from '../../home'

export const getStaticProps: GetStaticProps<{
  tutorials: Array<ITutorialsItem> | null
}> = async () => {
  const { data: tutorials } = await supabase.from('tutorials').select('*')

  return {
    props: {
      tutorials,
    },
    revalidate: 15,
  }
}

const TutorialsPage = ({ tutorials }: TutorialsBodyProps) => {
  return (
    <>
      <SeoHead
        description="Checkout our different tutorials for building different types of user interfaces. From simple to complex, we've got you covered."
        title="Tutorials"
      />
      <TutorialsHeader />
      <TutorialsBody tutorials={tutorials} />
    </>
  )
}

TutorialsPage.Layout = HomeTemplate

export default TutorialsPage
