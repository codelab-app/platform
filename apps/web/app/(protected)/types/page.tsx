import type { Metadata } from 'next'

import { CreateFieldModal } from '@codelab/frontend-application-type/use-cases/create-field'
import { CreateTypeModal } from '@codelab/frontend-application-type/use-cases/create-type'
import { DeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { DeleteTypeModal } from '@codelab/frontend-application-type/use-cases/delete-type'
import { TypeEditor } from '@codelab/frontend-application-type/use-cases/get-types'
import { UpdateFieldModal } from '@codelab/frontend-application-type/use-cases/update-field'
import { UpdateTypeModal } from '@codelab/frontend-application-type/use-cases/update-type'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'

export const metadata: Metadata = {
  // description: '...',
  title: 'Types | Codelab',
}

const TypesRoute = () => {
  return (
    <>
      <CreateFieldModal />
      <UpdateFieldModal />
      <DeleteFieldModal />

      <CreateTypeModal />
      <DeleteTypeModal />
      <UpdateTypeModal />

      <ContentSection>
        <TypeEditor />
      </ContentSection>
    </>
  )
}

export default TypesRoute
