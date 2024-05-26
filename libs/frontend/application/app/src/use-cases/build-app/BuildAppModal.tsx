'use client'

import { observer } from 'mobx-react-lite'
import React from 'react'

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
  return <div>Hi</div>
})
