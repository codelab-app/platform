import { PageType } from '@codelab/frontend/abstract/types'
import { IComponent } from '@codelab/shared/abstract/core'
import Link from 'next/link'

export type NameColumnProps = {
  component: IComponent
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
