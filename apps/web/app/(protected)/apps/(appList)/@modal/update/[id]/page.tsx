import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return <UpdateAppModal id={id} />
}

export default Page
