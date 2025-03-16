import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { AppConnector } from '../../views/App.connector'
import { UpdateAppModal } from './UpdateAppModal'

export const UpdateAppModalContainer = ({ id }: { id: string }) => {
  return (
    <AppConnector id={id}>
      {(app: IAppModel) => <UpdateAppModal app={app} />}
    </AppConnector>
  )
}

UpdateAppModalContainer.displayName = 'UpdateAppModalContainer'
