import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const {
    id
  } = params;

  return <BuildAppModal id={id} />
}

export default Page
