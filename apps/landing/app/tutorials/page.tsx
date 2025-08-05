import type { Metadata } from 'next'

import { supabase } from '../../utils/supabase'
import TutorialsPageClient from './tutorials-page-client'

export const metadata: Metadata = {
  title: 'Tutorials',
  description:
    "Checkout our different tutorials for building different types of user interfaces. From simple to complex, we've got you covered.",
}

export const revalidate = 15

const getTutorials = async () => {
  const { data: tutorials } = await supabase.from('tutorials').select('*')
  return tutorials
}

const TutorialsPage = async () => {
  const tutorials = await getTutorials()

  return <TutorialsPageClient tutorials={tutorials || []} />
}

export default TutorialsPage
