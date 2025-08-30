'use client'

import type { ITutorialsItem } from '../../src/home/tutorials/TutorialsBody'

import HomeTemplate from '../../src/home/HomeTemplate'
import { TutorialsBody } from '../../src/home/tutorials/TutorialsBody'
import { TutorialsHeader } from '../../src/home/tutorials/TutorialsHeader'

interface TutorialsPageClientProps {
  tutorials: Array<ITutorialsItem>
}

const TutorialsPageClient = ({ tutorials }: TutorialsPageClientProps) => {
  return (
    <HomeTemplate>
      <TutorialsHeader />
      <TutorialsBody tutorials={tutorials} />
    </HomeTemplate>
  )
}

export default TutorialsPageClient
