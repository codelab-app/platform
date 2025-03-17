import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { UpdateFieldPopoverLayout } from '@codelab/frontend-application-type/use-cases/update-field'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

export default UpdateFieldPopoverLayout
