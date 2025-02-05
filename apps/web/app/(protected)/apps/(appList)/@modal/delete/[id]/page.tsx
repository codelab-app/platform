import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <DeleteAppModal id={id} />
}

export default Page
