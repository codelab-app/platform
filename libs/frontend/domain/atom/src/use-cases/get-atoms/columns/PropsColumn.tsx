import { PageType } from '@codelab/frontend/abstract/types'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { AtomRecordProps } from './types'

export const PropsColumn = ({ atom }: AtomRecordProps) => {
  return (
    <Link
      css={tw`text-blue-700`}
      href={{
        pathname: PageType.Type,
        query: { typeId: atom.apiId },
      }}
    >
      View API
    </Link>
  )
}
