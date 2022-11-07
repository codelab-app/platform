import { PageType } from '@codelab/frontend/abstract/types'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { PropsColumnProps } from './types'

export const PropsColumn = ({ component }: PropsColumnProps) => {
  return (
    <Link
      css={tw`text-blue-700`}
      href={{
        pathname: PageType.Type,
        query: { typeId: component.apiId },
      }}
    >
      View API
    </Link>
  )
}
