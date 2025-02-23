import type { Metadata } from 'next'

import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'

export const metadata: Metadata = {
  title: 'Delete App | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <DeleteAppModal id={id} />
}

export default Page
