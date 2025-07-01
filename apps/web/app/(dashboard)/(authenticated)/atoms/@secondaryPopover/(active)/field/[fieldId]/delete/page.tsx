import type { PageProps } from '@codelab/frontend-abstract-types'

import { parsePageProps } from '@codelab/frontend-application-shared-services/router'
import { DeleteFieldModalContainer } from '@codelab/frontend-application-type/use-cases/delete-field'

const Page = async (props: PageProps<'fieldId'>) => {
  const {
    params: { fieldId },
  } = await parsePageProps(props)

  return <DeleteFieldModalContainer id={fieldId} />
}

export default Page
