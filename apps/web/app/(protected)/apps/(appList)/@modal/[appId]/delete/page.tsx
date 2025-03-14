import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { Metadata } from 'next'

import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { AppConnector } from '@codelab/frontend-application-app/views'

import { DeleteAppModalContainer } from './page.client'

export const metadata: Metadata = {
  title: 'Delete App | Codelab',
}

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <DeleteAppModalContainer id={id} />
}

export default Page
