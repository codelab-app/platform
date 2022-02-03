import Link from 'next/link'
import tw from 'twin.macro'
import { PropsColumnProps } from './types'

const BlueLink = tw.a`text-blue-700`

export const PropsColumn = ({ atom }: PropsColumnProps) => {
  // TODO fix this after integrating type module
  // const href = PageType.InterfaceDetail.replace('[interfaceId]', atom.api.id)
  const href = ''

  return (
    <Link href={href}>
      <BlueLink>View API</BlueLink>
    </Link>
  )
}
