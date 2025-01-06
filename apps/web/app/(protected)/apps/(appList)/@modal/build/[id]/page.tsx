import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return <BuildAppModal id={id} />
}

export default Page
