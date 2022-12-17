import { PageType } from '@codelab/frontend/abstract/types'
import Link from 'next/link'
import React from 'react'
import type { ComponentColumnData } from './types'

export interface NameColumnProps {
  component: ComponentColumnData
}

export const NameColumn = ({ component }: NameColumnProps) => (
  <Link
    href={{
      pathname: PageType.ComponentDetail,
      query: { componentId: component.id },
    }}
  >
    {component.name}
  </Link>
)
