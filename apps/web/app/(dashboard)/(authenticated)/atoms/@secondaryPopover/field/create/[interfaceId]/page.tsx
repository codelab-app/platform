import { IRouteType } from '@codelab/frontend/abstract/application'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'

const Page = async ({
  params,
}: {
  params: Promise<{ interfaceId: string }>
}) => {
  const { interfaceId } = await params

  return (
    <CreateFieldPopover
      context={{
        params: { interfaceId },
        type: IRouteType.Atom,
      }}
      interfaceId={interfaceId}
    />
  )
}

export default Page
