import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateAppDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { WithAppService } from '../../store'
import { createAppSchema } from './createAppSchema'

export const CreateAppModal = observer<WithAppService>(({ appService }) => {
  const { user } = useUser()

  const onSubmit = (input: ICreateAppDTO) => {
    if (!user?.sub) {
      throw new Error('Missing user sub')
    }

    return appService.create({ ...input }, user?.sub)
  }

  const closeModal = () => appService.createModal.close()

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      visible={appService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating app',
        })}
        onSubmitSuccess={closeModal}
        schema={createAppSchema}
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
