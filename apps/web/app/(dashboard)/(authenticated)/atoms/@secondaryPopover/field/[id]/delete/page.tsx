import {
  DeleteFieldModal,
  DeleteFieldModalContainer,
} from '@codelab/frontend-application-type/use-cases/delete-field'
import { FieldConnector } from '@codelab/frontend-application-type/views'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <DeleteFieldModalContainer id={id} />
}

export default Page
