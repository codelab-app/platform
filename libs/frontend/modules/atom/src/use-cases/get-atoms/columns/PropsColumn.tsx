import { PageType } from '@codelab/frontend/abstract/types'
import Link from 'next/link'
import tw from 'twin.macro'
import { PropsColumnProps } from './types'

const BlueLink = tw.a`text-blue-700`

export const PropsColumn = ({ atom }: PropsColumnProps) => {
  return (
    <Link
      href={{
        pathname: PageType.InterfaceDetail,
        query: { interfaceId: atom.api.id },
      }}
    >
      <BlueLink>View API</BlueLink>
    </Link>
  )
}
