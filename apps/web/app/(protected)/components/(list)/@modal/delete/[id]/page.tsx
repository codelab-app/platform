import { DeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <DeleteComponentModal id={id} />
}

export default Page
