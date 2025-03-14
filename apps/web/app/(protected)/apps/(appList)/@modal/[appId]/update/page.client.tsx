import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { AppConnector } from '@codelab/frontend-application-app/views'

export const UpdateAppModalContainer = ({ id }: { id: string }) => {
  return (
    <AppConnector id={id}>
      {(app: IAppModel) => <UpdateAppModal app={app} />}
    </AppConnector>
  )
}
