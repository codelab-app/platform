import type { Metadata } from 'next'

import { DeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'

export const metadata: Metadata = {
  title: 'Delete Component | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <DeleteComponentModal id={id} />
}

export default Page
