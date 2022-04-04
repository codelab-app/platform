import { PageType } from '@codelab/frontend/abstract/types'
import Link from 'next/link'
import { ComponentColumnData } from './types'

export type NameColumnProps = {
  component: ComponentColumnData
}

export const NameColumn = ({ component }: NameColumnProps) => (
  <Link
    href={{
      pathname: PageType.ComponentDetail,
      query: { componentId: component.id },
    }}
  >
    <a>{component.name}</a>
  </Link>
)
