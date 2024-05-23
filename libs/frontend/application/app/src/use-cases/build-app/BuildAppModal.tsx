'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useRegeneratePages } from '@codelab/frontend/application/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  emptyJsonSchema,
  ModalForm,
} from '@codelab/frontend-presentation-view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const BuildAppModal = observer(() => {
  // const store = useStore()

  // console.log(store)
  // const { appService } = useStore()
  // const app = appService.buildModal.app
  // const { regenerate } = useRegeneratePages(appService)
  // const onSubmit = async () => regenerate(app as IAppModel)
  // const closeModal = () => appService.buildModal.close()

  // return (
  //   <ModalForm.Modal
  //     okText="Build App"
  //     onCancel={closeModal}
  //     open={appService.buildModal.isOpen}
  //   >
  //     <ModalForm.Form
  //       model={{}}
  //       onSubmit={onSubmit}
  //       onSubmitSuccess={closeModal}
  //       schema={emptyJsonSchema}
  //       uiKey={MODEL_ACTION.BuildApp.key}
  //     >
  //       <h4>Are you sure you want to build all pages for "{app?.name}"?</h4>
  //       <AutoFields />
  //     </ModalForm.Form>
  //   </ModalForm.Modal>
  // )
  return <></>
})
