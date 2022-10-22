import { PageType } from '@codelab/frontend/abstract/types'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { PropsColumnProps } from './types'

const BlueLink = tw.a`text-blue-700`

export const PropsColumn = ({ component }: PropsColumnProps) => {
  return (
    <Link
      href={{
        pathname: PageType.Type,
        query: { typeId: component.apiId },
      }}
    >
      <BlueLink>View API</BlueLink>
    </Link>
  )
}
