import { PageType } from '@codelab/frontend/abstract/types'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { AtomRecordProps } from './types'

const BlueLink = tw.a`text-blue-700`

export const PropsColumn = ({ atom }: AtomRecordProps) => {
  return (
    <Link
      href={{
        pathname: PageType.Type,
        query: { typeId: atom.apiId },
      }}
    >
      <BlueLink>View API</BlueLink>
    </Link>
  )
}
