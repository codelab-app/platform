import type { Metadata } from 'next'

import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'

export const metadata: Metadata = {
  title: 'Update App | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <UpdateAppModal id={id} />
}

export default Page
