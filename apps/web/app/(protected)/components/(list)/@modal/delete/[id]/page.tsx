import { DeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return <DeleteComponentModal id={id} />
}

export default Page
