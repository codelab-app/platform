import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return <DeleteAppModal id={id} />
}

export default Page
