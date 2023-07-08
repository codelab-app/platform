import { PageType } from '@codelab/frontend/abstract/types'
import Link from 'next/link'
import React from 'react'
import type { PropsColumnProps } from './types'

export const PropsColumn = ({ component }: PropsColumnProps) => {
  return (
    <Link
      className="text-blue-700"
      href={{
        pathname: PageType.Type,
        query: { typeId: component.apiId },
      }}
    >
      View API
    </Link>
  )
}
