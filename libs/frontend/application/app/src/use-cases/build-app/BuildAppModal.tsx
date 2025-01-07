'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useAppService } from '../../services/app.service'
import { useBuildApp } from './useBuildApp.hook'

export const BuildAppModal = observer(({ id }: { id: string }) => {
  const router = useRouter()
  const { appDomainService } = useDomainStore()
  const app = appDomainService.apps.get(id)
  const { regenerate } = useBuildApp()

  const onSubmit = () => {
    return app ? regenerate(app) : Promise.reject()
  }

  const closeModal = () => router.push(PageType.AppList())

  return (
    <ModalForm.Modal
      okText="Build App"
      onCancel={closeModal}
      open={true}
      uiKey={UiKey.AppModalBuild}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to build all pages for "{app?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
