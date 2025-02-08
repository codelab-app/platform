import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const { id } = params

  return <UpdateAppModal id={id} />
}

export default Page
