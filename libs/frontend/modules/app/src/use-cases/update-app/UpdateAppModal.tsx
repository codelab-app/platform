import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IUpdateAppDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { WithAppService } from '../../store'
import { updateAppSchema } from './updateAppSchema'

export const UpdateAppModal = observer<WithAppService>(({ appService }) => {
  const app = appService.updateModal.app

  if (!app) {
    return null
  }

  const onSubmit = (input: IUpdateAppDTO) => appService.update(app, input)
  const closeModal = () => appService.updateModal.close()

  const model = {
    name: app?.name,
    storeId: app?.store?.id,
  }

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      visible={appService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateAppDTO>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating app',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
      >
        <AutoFields omitFields={['storeId']} />
        <AutoField
          name="storeId"
          // get root stores only
          where={{ parentStoreAggregate: { count: 0 } }}
        />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
